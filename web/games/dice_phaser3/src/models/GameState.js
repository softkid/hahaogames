import { EventBus, GameEvents } from '../core/EventBus';

export class GameState {
  constructor() {
    // 플레이어 스탯
    this.playerHP = 100;
    this.maxHP = 100;
    this.playerMP = 50;
    this.maxMP = 50;
    this.attack = 20;
    this.defense = 5;
    this.stress = 0;
    this.maxStress = 100;

    // 몬스터 스탯
    this.monsterName = '동진회 행동대장';
    this.monsterHP = 120;
    this.maxMonsterHP = 120;
    this.monsterATK = 15;

    // 주사위 및 슬롯
    this.availableDice = [];
    this.slots = [];
    this.logs = [];

    this.initSlots();
  }

  initSlots() {
    this.slots = [
      {
        id: 'BASIC_ATTACK',
        name: '일반 사격',
        conditionText: '제한 없음 (눈금 1개)',
        assignedDice: null,
        validator: () => true
      },
      {
        id: 'HEAVY_STRIKE',
        name: '정밀 타격',
        conditionText: '눈금 4 이상',
        assignedDice: null,
        validator: (d) => d.value >= 4
      },
      {
        id: 'CRITICAL_HIT',
        name: '급소 찌르기',
        conditionText: '눈금 6 전용',
        assignedDice: null,
        validator: (d) => d.value === 6
      },
      {
        id: 'TACTICAL_GUARD',
        name: '전술 방어',
        conditionText: '짝수 눈금 전용',
        assignedDice: null,
        validator: (d) => d.value % 2 === 0
      }
    ];
  }

  rollDice(count = 4) {
    this.availableDice = Array.from({ length: count }, (_, i) => ({
      id: i,
      value: Math.floor(Math.random() * 6) + 1,
      isGlitched: this.stress >= 80 && Math.random() < 0.3,
      isUsed: false
    }));

    this.slots.forEach(s => s.assignedDice = null);
    
    this.addLog('주사위를 굴렸습니다.');
    this.notifyUpdate();
  }

  assignDiceToSlot(diceId, slotId) {
    const dice = this.availableDice.find(d => d.id === diceId);
    const slot = this.slots.find(s => s.id === slotId);

    if (!dice || !slot || dice.isUsed) return false;

    if (slot.validator(dice)) {
      slot.assignedDice = dice;
      dice.isUsed = true;
      this.addLog(`[${slot.name}] 슬롯에 주사위 (${dice.value})를 할당했습니다.`);
      this.notifyUpdate();
      return true;
    } else {
      this.addLog(`조건에 맞지 않는 주사위입니다.`);
      return false;
    }
  }

  executeTurn() {
    let totalDamage = 0;
    let totalShield = 0;

    this.slots.forEach(slot => {
      if (!slot.assignedDice) return;
      const val = slot.assignedDice.value;

      switch (slot.id) {
        case 'BASIC_ATTACK':
          totalDamage += Math.floor(val * (this.attack * 0.15));
          break;
        case 'HEAVY_STRIKE':
          totalDamage += Math.floor(this.attack * 1.5);
          break;
        case 'CRITICAL_HIT':
          totalDamage += Math.floor(this.attack * 2.5);
          break;
        case 'TACTICAL_GUARD':
          totalShield += val * 10;
          break;
      }
    });

    if (totalDamage > 0) {
      this.monsterHP = Math.max(0, this.monsterHP - totalDamage);
      this.addLog(`적에게 ${totalDamage}의 데미지를 입혔습니다!`);
      EventBus.emit(GameEvents.ATTACK_EXECUTE, { target: 'monster', damage: totalDamage });
    }

    if (this.monsterHP > 0) {
      const incomingDamage = Math.max(0, this.monsterATK - totalShield);
      this.playerHP = Math.max(0, this.playerHP - incomingDamage);
      this.addLog(`적이 공격했습니다! (방어막: ${totalShield}, 입은 피해: ${incomingDamage})`);
      EventBus.emit(GameEvents.ATTACK_EXECUTE, { target: 'player', damage: incomingDamage });
    }

    this.rollDice();
  }

  addLog(message) {
    this.logs.unshift(message);
    if (this.logs.length > 20) this.logs.pop();
    EventBus.emit(GameEvents.LOG_ADDED, message);
  }

  notifyUpdate() {
    EventBus.emit(GameEvents.STATE_UPDATED, this);
  }
}

export const gameStateInstance = new GameState();
