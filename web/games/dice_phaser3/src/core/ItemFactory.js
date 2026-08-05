export class ItemFactory {
  static createItem(id) {
    switch (id) {
      case 'CIGARETTE':
        return {
          id: 'CIGARETTE',
          name: '담배',
          type: 'CONSUMABLE',
          description: '보유 주사위 2개를 재굴림합니다. (스트레스 완화)',
          effectValue: 2,
          price: 50,
          quantity: 1
        };
      case 'WHISKY':
        return {
          id: 'WHISKY',
          name: '위스키',
          type: 'CONSUMABLE',
          description: 'HP 30% 즉시 회복 및 스트레스 20 감소',
          effectValue: 30,
          price: 120,
          quantity: 1
        };
      case 'KATANA':
        return {
          id: 'KATANA',
          name: '카타나',
          type: 'WEAPON',
          description: 'ATK +25, 정밀 타격 조건 완화',
          effectValue: 25,
          price: 500
        };
      case 'ORPHANAGE_DICE':
        return {
          id: 'ORPHANAGE_DICE',
          name: '보육원 주사위',
          type: 'QUEST',
          description: '판매 불가. 진태식과 류노스케의 과거가 담긴 주사위.',
          effectValue: 0,
          price: 0
        };
      default:
        throw new Error(`존재하지 않는 아이템 ID입니다: ${id}`);
    }
  }
}
