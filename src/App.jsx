import React, { useState, useEffect, useRef } from 'react';
import Countdown from './components/Countdown';
import CakeSection from './components/CakeSection';
import LetterEnvelope from './components/LetterEnvelope';
import Fireworks from './components/Fireworks';

// Local image import
import surpriseImage from './assets/photo.jpeg'; 

const RECIPIENT_NAME = "Biboy";
const LETTER_MESSAGE = `To my one and only Biboy,

Happy Birthday (˶˃ ᵕ ˂˶) .ᐟ.ᐟ

Today marks the 21th year of your amazing journey, so I have prepared this special letter for you. 

I know I have told you so many times about how much of an amazing boyfriend you are because its true, but maybe I haven't given you an emphasis or the reason why I believe so.

Starting from senior high you have given your constant effort to make me happy, feeled loved and cared for. With your little palusot para lng makasabay mo ako to our actual moments together.

Your special way of writing and reading me poems and letters shows how much you really care and value me. I feel touched everytime you create something new, I see the passion that you have through your voice and your words.

Sa mga libre mo sakin ng katsudon lowkey miss those moments, I hope sometime we can get a taste of that yummy katsudon ulit together.

We've been together for 3 years and for me our love is like wine na the longer it ages the better it gets.

Though our ups and downs, you have always been there for me kahit anong mangyari.

No one is more passionate and dedicated than me lalabs.

Not only are you an amazing boyfriend but your also an amazing person. You have consistently shown hospitality and kindness sa lahat ng mga tao na nadadaanan mo, supporting them sa mga kailangan nila.

You are kind and a hardworking. You always put an effort to your works kahit sa bahay man yan, sa school or sa laro. You never fail to act on the things you need to do. You do the job and you get the job done regardless of the circumstances and the state you're in.

Thank you for being who your are, for always supporting me, for being my comfort, my best friend and partner. I am really blessed to have you me lalabs and I am really greatful sayo

I will continue to love you and care for you until time takes me, I hope you enjoy this special day and I hope you have a wonderful year ahead. 

I loveeee loveeeee loveeee youuuu sooooooo mucchhhhh me lalaaaaabssss!! (づ ̄ ³ ̄)づ 💖✨

like really🥺💖
  

    ∧,,,∧
(  ̳• · • ̳)
/    づ♡ I love you

`;

export default function App() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isTargetReached, setIsTargetReached] = useState(false);
  const [isManualUnlocked, setIsManualUnlocked] = useState(false);
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [showScrollPrompt, setShowScrollPrompt] = useState(false);
  const [isLoadingTime, setIsLoadingTime] = useState(true);

  const timeOffsetRef = useRef(0);

  const getManilaDate = (dateObj) => {
    const options = { timeZone: 'Asia/Manila', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false };
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const parts = formatter.formatToParts(dateObj);
    
    let year, month, day, hour, minute, second;
    parts.forEach(part => {
      if (part.type === 'year') year = parseInt(part.value);
      if (part.type === 'month') month = parseInt(part.value) - 1;
      if (part.type === 'day') day = parseInt(part.value);
      if (part.type === 'hour') hour = parseInt(part.value) % 24;
      if (part.type === 'minute') minute = parseInt(part.value);
      if (part.type === 'second') second = parseInt(part.value);
    });

    return new Date(year, month, day, hour, minute, second);
  };

  useEffect(() => {
    let timer;

    const fetchManilaTime = async () => {
      try {
        const response = await fetch('https://worldtimeapi.org/api/timezone/Asia/Manila');
        const data = await response.json();
        
        const apiManilaTime = new Date(data.datetime);
        const localNow = new Date();

        timeOffsetRef.current = apiManilaTime.getTime() - localNow.getTime();
      } catch (error) {
        console.warn("WorldTimeAPI fetch failed, fallback to adjusted local clock.", error);
      } finally {
        setIsLoadingTime(false);
        startCountdown();
      }
    };

    const updateCountdown = () => {
      const adjustedNow = new Date(Date.now() + timeOffsetRef.current);
      const manilaNow = getManilaDate(adjustedNow);

      const targetYear = manilaNow.getFullYear();
      let targetDate = new Date(targetYear, 8, 16, 0, 0, 0);

      if (manilaNow > targetDate && !(manilaNow.getMonth() === 8 && manilaNow.getDate() === 16)) {
        targetDate = new Date(targetYear + 1, 8, 16, 0, 0, 0);
      }

      const diff = targetDate - manilaNow;

      if (diff <= 0 || (manilaNow.getMonth() === 8 && manilaNow.getDate() === 16)) {
        setIsTargetReached(true);
      } else {
        setIsTargetReached(false);
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    };

    const startCountdown = () => {
      updateCountdown();
      timer = setInterval(updateCountdown, 1000);
    };

    fetchManilaTime();

    return () => clearInterval(timer);
  }, []);

  const handleCandleBlow = () => {
    setCandlesBlown(true);
    setTimeout(() => {
      setShowScrollPrompt(true);
    }, 5000);
  };

  const showCakeSection = isTargetReached || isManualUnlocked;

  return (
    <div className={`app-frame text-white w-100 position-relative ${!showScrollPrompt ? 'scroll-locked' : ''}`}>
      
      {/* Night Sky Stars */}
      <div className="star-field"></div>

      {/* Abstract & Heart Fireworks */}
      {candlesBlown && <Fireworks />}

      {/* SECTION 1: Countdown or Cake View */}
      <div className="snap-screen">
        {/* Added pt-5 mt-4 so header sits clear of iPhone notch */}
        <div className="text-center pt-5 mt-4 z-1">
          <h1 className="h4 fw-bold text-uppercase text-warning mb-1">
            {showCakeSection ? "HAPPY BIRTHDAY!" : "THE COUNTDOWN"}
          </h1>
          <p className="small text-light opacity-75">
            {showCakeSection ? "Make a wish and blow out the candle!" : "Waiting for September 16th (PST)..."}
          </p>
        </div>

        {isLoadingTime ? (
          <div className="my-auto text-center">
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Loading Manila Time...</span>
            </div>
            <p className="small text-light opacity-75 mt-2">Syncing Manila real-time...</p>
          </div>
        ) : !showCakeSection ? (
          <Countdown 
            timeLeft={timeLeft} 
            onUnlock={() => setIsManualUnlocked(true)} 
          />
        ) : (
          <CakeSection 
            recipientName={RECIPIENT_NAME} 
            imageUrl={surpriseImage} 
            candlesBlown={candlesBlown} 
            onBlow={handleCandleBlow} 
          />
        )}

        {/* Scroll Prompt */}
        <div className={`transition-opacity mb-2 text-center z-1 ${showScrollPrompt ? 'opacity-100' : 'opacity-0'}`}>
          <small className="text-light d-block mb-1 opacity-75">Scroll down for a message</small>
          <div className="text-warning h5 mb-0">↓</div>
        </div>
      </div>

      {/* SECTION 2: Envelope View */}
      {showScrollPrompt && (
        <div className="snap-screen bg-black bg-opacity-40 justify-content-center">
          <LetterEnvelope message={LETTER_MESSAGE} recipientName={RECIPIENT_NAME} />
        </div>
      )}

    </div>
  );
}