
import React, { createContext, useContext, useState, useEffect } from 'react';

interface GameContextType {
  points: number;
  level: number;
  nickname: string;
  avatar: string;
  addPoints: (amount: number) => void;
  setUserProfile: (nickname: string, avatar: string) => void;
  getStreak: () => number;
  incrementStreak: () => void;
  resetStreak: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [points, setPoints] = useState(() => {
    const saved = localStorage.getItem('filaJunina_points');
    return saved ? parseInt(saved) : 0;
  });
  
  const [nickname, setNickname] = useState(() => {
    return localStorage.getItem('filaJunina_nickname') || '';
  });
  
  const [avatar, setAvatar] = useState(() => {
    return localStorage.getItem('filaJunina_avatar') || '🌽';
  });
  
  const [streak, setStreak] = useState(() => {
    const saved = localStorage.getItem('filaJunina_streak');
    return saved ? parseInt(saved) : 0;
  });

  const level = Math.floor(points / 100) + 1;

  useEffect(() => {
    localStorage.setItem('filaJunina_points', points.toString());
  }, [points]);

  useEffect(() => {
    localStorage.setItem('filaJunina_nickname', nickname);
  }, [nickname]);

  useEffect(() => {
    localStorage.setItem('filaJunina_avatar', avatar);
  }, [avatar]);

  useEffect(() => {
    localStorage.setItem('filaJunina_streak', streak.toString());
  }, [streak]);

  const addPoints = (amount: number) => {
    setPoints(prev => prev + amount);
  };

  const setUserProfile = (newNickname: string, newAvatar: string) => {
    setNickname(newNickname);
    setAvatar(newAvatar);
  };

  const getStreak = () => streak;

  const incrementStreak = () => {
    setStreak(prev => prev + 1);
  };

  const resetStreak = () => {
    setStreak(0);
  };

  return (
    <GameContext.Provider value={{
      points,
      level,
      nickname,
      avatar,
      addPoints,
      setUserProfile,
      getStreak,
      incrementStreak,
      resetStreak
    }}>
      {children}
    </GameContext.Provider>
  );
};
