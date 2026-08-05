import Phaser from 'phaser';

export const EventBus = new Phaser.Events.EventEmitter();

export const GameEvents = {
  BATTLE_START: 'BATTLE_START',
  DICE_ROLLED: 'DICE_ROLLED',
  SLOT_ASSIGNED: 'SLOT_ASSIGNED',
  ATTACK_EXECUTE: 'ATTACK_EXECUTE',
  STATE_UPDATED: 'STATE_UPDATED',
  LOG_ADDED: 'LOG_ADDED'
};
