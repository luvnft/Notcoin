import { useEffect, useState } from 'react';
import './index.css';
import Arrow from './icons/Arrow';
import { gem, coin, highVoltage, notcoin, bank, trophy } from './images';

const App = () => {
  const [points, setPoints] = useState(29857775);
  const [energy, setEnergy] = useState(2532);
  const [clicks, setClicks] = useState<{ id: number, x: number, y: number }[]>([]);
  const pointsToAdd = 12;
  const energyToReduce = 12;

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (energy - energyToReduce < 0) {
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPoints(points + pointsToAdd);
    setEnergy(energy - energyToReduce < 0 ? 0 : energy - energyToReduce);
    setClicks([...clicks, { id: Date.now(), x, y }]);
  };

  const handleAnimationEnd = (id: number) => {
    setClicks((prevClicks) => prevClicks.filter(click => click.id !== id));
  };

  // useEffect hook to restore energy over time
  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy((prevEnergy) => Math.min(prevEnergy + 1, 6500));
    }, 100); // Restore 10 energy points every second

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen px-4 font-medium text-white bg-gradient-main">

      <div className="absolute inset-0 z-0 h-1/2 bg-gradient-overlay"></div>
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <div className="radial-gradient-overlay"></div>
      </div>

      <div className="z-10 flex flex-col items-center w-full min-h-screen text-white">

        <div className="fixed top-0 left-0 z-10 flex flex-col items-center w-full px-4 pt-8 text-white">
          <div className="w-full cursor-pointer">
            <a href="https://t.me/share/url?text=%0A%F0%9F%91%91%20Join%20me%20in%20@Major%20game%20and%20earn%20$MAJOR%20token%20soon!%0A%E2%AD%90%EF%B8%8F%20750%20rating%20bonus%20for%20you.%0A%E2%AD%90%EF%B8%8F%201000%20rating%20bonus%20if%20you%20are%20Premium.%0A&url=https://t.me/major/start?startapp=1407189337" target="_blank" rel="noopener noreferrer">
              <div className="bg-[#1f1f1f] text-center py-2 rounded-xl">
                <p className="text-lg">Join squad <Arrow size={18} className="inline-block mb-1 ml-0" /></p>
              </div>
            </a>
          </div>
          <div className="flex items-center mt-12 text-5xl font-bold">
            <img src={coin} width={44} height={44} />
            <span className="ml-2">{points.toLocaleString()}</span>
          </div>
          <div className="flex items-center mt-2 text-base">
            <img src={trophy} width={24} height={24} />
            <span className="ml-1">Gold <Arrow size={18} className="inline-block mb-1 ml-0" /></span>
          </div>
        </div>


        <div className="fixed bottom-0 left-0 z-10 w-full px-4 pb-4">
          <div className="flex justify-between w-full gap-2">
            <div className="flex items-center justify-start w-1/3 max-w-32">
              <div className="flex items-center justify-center">
                <img src={highVoltage} width={44} height={44} alt="High Voltage" />
                <div className="ml-2 text-left">
                  <span className="block text-2xl font-bold text-white">{energy}</span>
                  <span className="text-white opacity-75 text-large">/ 6500</span>
                </div>
              </div>
            </div>
            <div className="flex items-center flex-grow text-sm max-w-60">
              <div className="w-full bg-[#fad258] py-4 rounded-2xl flex justify-around">
                <a href="https://t.me/+2KBvu5JMHYk4MDdh" target="_blank" rel="noopener noreferrer">
                  <button className="flex flex-col items-center gap-1">
                    <img src={gem} width={24} height={24} alt="Gem" />
                    <span>PPV GEM</span>
                  </button>
                </a>
                <div className="h-[48px] w-[2px] bg-[#fddb6d]"></div>
                <a href="https://t.me/+2KBvu5JMHYk4MDdh" target="_blank" rel="noopener noreferrer">
                  <button className="flex flex-col items-center gap-1">
                    <img src={coin} width={24} height={24} alt="Coin" />
                    <span>Earn</span>
                  </button>
                </a>
                <div className="h-[48px] w-[2px] bg-[#fddb6d]"></div>
                <a href="https://tonass.arvrtise.com/" target="_blank" rel="noopener noreferrer">
                  <button className="flex flex-col items-center gap-1">
                    <img src={bank} width={24} height={24} alt="Bank" />
                    <span>Stake (Soon)</span>
                  </button>
                </a>
              </div>
            </div>
          </div>
          <div className="w-full bg-[#f9c035] rounded-full mt-4">
            <div className="bg-gradient-to-r from-[#f3c45a] to-[#fffad0] h-4 rounded-full" style={{ width: `${(energy / 6500) * 100}%` }}></div>
          </div>
        </div>


        <div className="flex items-center justify-center flex-grow">
          <div className="relative mt-4" onClick={handleClick}>
            <img src={notcoin} width={256} height={256} alt="notcoin" />
            {clicks.map((click) => (
              <div
                key={click.id}
                className="absolute text-5xl font-bold opacity-0"
                style={{
                  top: `${click.y - 42}px`,
                  left: `${click.x - 28}px`,
                  animation: `float 1s ease-out`
                }}
                onAnimationEnd={() => handleAnimationEnd(click.id)}
              >
                12
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default App;