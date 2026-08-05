import Phaser from 'phaser';
import { EventBus, GameEvents } from '../core/EventBus';

export class BattleScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BattleScene' });
  }

  create() {
    this.cameras.main.setBackgroundColor('#0a0a0a');

    this.playerSprite = this.add.rectangle(200, 300, 80, 120, 0x333333).setStrokeStyle(2, 0xffffff);
    this.add.text(160, 370, '진태식 (UNDERCOVER)', { fontSize: '12px', color: '#ffffff' });

    this.monsterSprite = this.add.rectangle(600, 300, 90, 130, 0x551111).setStrokeStyle(2, 0xff0000);
    this.add.text(560, 370, '동진회 행동대장', { fontSize: '12px', color: '#ff4444' });

    EventBus.on(GameEvents.ATTACK_EXECUTE, (data) => {
      this.playHitAnimation(data.target, data.damage);
    });
  }

  playHitAnimation(target, damage) {
    const sprite = target === 'monster' ? this.monsterSprite : this.playerSprite;
    const startX = sprite.x;

    this.tweens.add({
      targets: sprite,
      x: startX + (target === 'monster' ? 15 : -15),
      duration: 50,
      yoyo: true,
      repeat: 3,
      onComplete: () => {
        sprite.x = startX;
      }
    });

    const damageText = this.add.text(
      sprite.x,
      sprite.y - 50,
      `-${damage}`,
      { fontSize: '24px', color: target === 'monster' ? '#ff3333' : '#ffffff', fontStyle: 'bold' }
    ).setOrigin(0.5);

    this.tweens.add({
      targets: damageText,
      y: damageText.y - 40,
      alpha: 0,
      duration: 800,
      onComplete: () => damageText.destroy()
    });
  }
}
