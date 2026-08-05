import React, { useEffect, useState } from 'react';
import { EventBus, GameEvents } from '../core/EventBus';
import { gameStateInstance } from '../models/GameState';

export const DiceBoard = () => {
  const [diceList, setDiceList] = useState([]);
  const [slots, setSlots] = useState([]);
  const [selectedDiceId, setSelectedDiceId] = useState(null);

  useEffect(() => {
    const handleUpdate = () => {
      setDiceList([...gameStateInstance.availableDice]);
      setSlots([...gameStateInstance.slots]);
    };

    EventBus.on(GameEvents.STATE_UPDATED, handleUpdate);
    gameStateInstance.rollDice();

    return () => {
      EventBus.off(GameEvents.STATE_UPDATED, handleUpdate);
    };
  }, []);

  const handleSlotClick = (slotId) => {
    if (selectedDiceId !== null) {
      gameStateInstance.assignDiceToSlot(selectedDiceId, slotId);
      setSelectedDiceId(null);
    }
  };

  return (
    <div className="w-full bg-neutral-900 border-t-2 border-neutral-700 p-4 text-white">
      <div className="mb-4">
        <p className="text-xs text-neutral-400 mb-2">보유 주사위 (클릭하여 선택 후 슬롯에 배치):</p>
        <div className="flex gap-3">
          {diceList.map((dice) => (
            <button
              key={dice.id}
              onClick={() => !dice.isUsed && setSelectedDiceId(dice.id)}
              disabled={dice.isUsed}
              className={`w-12 h-12 rounded border-2 font-bold text-lg transition-all ${
                dice.isUsed
                  ? 'bg-neutral-800 border-neutral-700 text-neutral-600 cursor-not-allowed'
                  : selectedDiceId === dice.id
                  ? 'bg-red-900 border-red-500 text-white scale-110'
                  : 'bg-neutral-800 border-neutral-500 text-neutral-100 hover:border-red-400'
              } ${dice.isGlitched ? 'animate-pulse text-purple-400' : ''}`}
            >
              {dice.value}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        {slots.map((slot) => (
          <div
            key={slot.id}
            onClick={() => handleSlotClick(slot.id)}
            className={`p-3 rounded border cursor-pointer transition-all ${
              slot.assignedDice
                ? 'bg-neutral-800 border-red-600'
                : 'bg-neutral-950 border-neutral-800 hover:border-neutral-600'
            }`}
          >
            <div className="text-sm font-bold text-neutral-200">{slot.name}</div>
            <div className="text-xs text-neutral-500 mb-2">{slot.conditionText}</div>
            <div className="text-center py-1 bg-neutral-900 rounded border border-neutral-800 text-xs font-mono">
              {slot.assignedDice ? `장착됨: [ ${slot.assignedDice.value} ]` : '슬롯 비어있음'}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => gameStateInstance.executeTurn()}
        className="w-full py-3 bg-red-700 hover:bg-red-600 font-bold tracking-wider rounded uppercase text-sm transition-colors"
      >
        턴 종료 / 행동 실행
      </button>
    </div>
  );
};
