import { createContext, ReactNode, useEffect, useState } from "react";
import challenges from "../../challenges.json";
import Cookies from "js-cookie";
import { LevelUpModal } from "../components/LevelUpModal";

interface ChallengesProviderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

interface Challenge {
  type: "body" | "eye";
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  experienceToNextLevel: number;
  activeChallenge: Challenge;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completechallenge: () => void;
  closeLevelupModal:() => void;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({
  children, ...rest
}: ChallengesProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1 );
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);

  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelupOpen, setIsLevelupOpen] = useState(false)

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Cookies.set("level", String(level));
    Cookies.set("currentExperience", String(currentExperience));
    Cookies.set("challengesCompleted", String(challengesCompleted));
  }, [level, currentExperience, challengesCompleted]);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  function levelUp() {
    setLevel((oldLevel) => oldLevel + 1);
    setIsLevelupOpen(true);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);

    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    new Audio("/notification.mp3").play();

    if (Notification.permission === "granted") {
      new Notification(
        `Novo desafio ${challenge.type == "body" ? "🎉" : "👁"}`,
        {
          body: `Valendo ${challenge.amount} xp!`,
          icon: "favicon.png",
        }
      );
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function closeLevelupModal() {
    setIsLevelupOpen(false);

  }

  function completechallenge() {
    if (!completechallenge) {
      return;
    }
    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;
    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  }

  return (
    <ChallengesContext.Provider
      value={{
        level,
        levelUp,
        currentExperience,
        experienceToNextLevel,
        challengesCompleted,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        completechallenge,
        closeLevelupModal,
      }}
    >
      {children}
      {isLevelupOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  );
}
