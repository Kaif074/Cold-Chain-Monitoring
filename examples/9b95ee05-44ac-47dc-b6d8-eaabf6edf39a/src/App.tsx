import React, { useState } from 'react';
import { ArrowLeftRight, Copy, Check, ThermometerSun, ThermometerSnowflake } from 'lucide-react';

type TemperatureUnit = 'celsius' | 'fahrenheit' | 'kelvin';

const REFERENCE_POINTS = [
  { temp: 100, unit: 'celsius', desc: '水沸点', icon: '💧' },
  { temp: 0, unit: 'celsius', desc: '水冰点', icon: '❄️' },
  { temp: 37, unit: 'celsius', desc: '人体正常体温', icon: '🧑' },
  { temp: 20, unit: 'celsius', desc: '室温', icon: '🏠' },
  { temp: -273.15, unit: 'celsius', desc: '绝对零度', icon: '🌡️' },
];

function App() {
  const [temperature, setTemperature] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<TemperatureUnit>('celsius');
  const [copied, setCopied] = useState(false);
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const convertTemperature = (value: number, from: TemperatureUnit, to: TemperatureUnit): number => {
    let celsius: number;
    
    switch(from) {
      case 'celsius':
        celsius = value;
        break;
      case 'fahrenheit':
        celsius = (value - 32) * 5/9;
        break;
      case 'kelvin':
        celsius = value - 273.15;
        break;
    }
    
    switch(to) {
      case 'celsius':
        return celsius;
      case 'fahrenheit':
        return (celsius * 9/5) + 32;
      case 'kelvin':
        return celsius + 273.15;
    }
  };

  const getConvertedValues = (): { [key in TemperatureUnit]: string } => {
    const num = parseFloat(temperature);
    if (isNaN(num)) return { celsius: '-', fahrenheit: '-', kelvin: '-' };

    return {
      celsius: convertTemperature(num, fromUnit, 'celsius').toFixed(2),
      fahrenheit: convertTemperature(num, fromUnit, 'fahrenheit').toFixed(2),
      kelvin: convertTemperature(num, fromUnit, 'kelvin').toFixed(2),
    };
  };

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getTemperatureIcon = () => {
    const num = parseFloat(temperature);
    if (isNaN(num)) return null;
    
    const celsiusValue = convertTemperature(num, fromUnit, 'celsius');
    return celsiusValue > 25 ? 
      <ThermometerSun className="w-8 h-8 text-amber-500" /> : 
      <ThermometerSnowflake className="w-8 h-8 text-blue-500" />;
  };

  const isValidTemperature = (value: string): boolean => {
    const num = parseFloat(value);
    if (isNaN(num)) return true;
    
    const kelvinValue = convertTemperature(num, fromUnit, 'kelvin');
    return kelvinValue >= 0;
  };

  const getTemperatureColor = () => {
    const num = parseFloat(temperature);
    if (isNaN(num)) return 'bg-gradient-to-br from-gray-50 to-gray-100';
    
    const celsiusValue = convertTemperature(num, fromUnit, 'celsius');
    if (celsiusValue > 35) return 'bg-gradient-to-br from-red-50 to-amber-100';
    if (celsiusValue > 20) return 'bg-gradient-to-br from-orange-50 to-amber-100';
    if (celsiusValue > 10) return 'bg-gradient-to-br from-blue-50 to-cyan-100';
    return 'bg-gradient-to-br from-blue-100 to-cyan-200';
  };

  const values = getConvertedValues();

  return (
    <div className={`min-h-screen ${getTemperatureColor()} flex items-center justify-center p-4 transition-colors duration-500`}>
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 w-full max-w-md border border-white/20">
        <div className="flex items-center justify-center gap-4 mb-8">
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-cyan-600 text-transparent bg-clip-text">
            温度转换器
          </h1>
          {getTemperatureIcon()}
        </div>
        
        <div className="space-y-8">
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              输入温度 ({fromUnit === 'celsius' ? '°C' : fromUnit === 'fahrenheit' ? '°F' : 'K'})
            </label>
            <input
              type="number"
              value={temperature}
              onChange={(e) => {
                const newValue = e.target.value;
                if (isValidTemperature(newValue)) {
                  setTemperature(newValue);
                }
              }}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
              placeholder="输入温度..."
            />
          </div>

          <div className="flex gap-2">
            {(['celsius', 'fahrenheit', 'kelvin'] as TemperatureUnit[]).map((unit) => (
              <button
                key={unit}
                onClick={() => setFromUnit(unit)}
                className={`flex-1 py-3 px-4 rounded-xl transition-all duration-200 font-medium ${
                  fromUnit === unit
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30 scale-105'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:scale-102'
                }`}
              >
                {unit === 'celsius' ? '°C' : unit === 'fahrenheit' ? '°F' : 'K'}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {(['celsius', 'fahrenheit', 'kelvin'] as TemperatureUnit[]).map((unit) => (
              fromUnit !== unit && (
                <div 
                  key={unit}
                  className="relative"
                  onMouseEnter={() => setActiveCard(unit)}
                  onMouseLeave={() => setActiveCard(null)}
                >
                  <div className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200 ${
                    activeCard === unit 
                      ? 'bg-blue-50 border-blue-200 shadow-lg scale-102' 
                      : 'bg-white/50 border-gray-200'
                  }`}>
                    <div>
                      <span className="text-sm font-medium text-gray-600">
                        {unit === 'celsius' ? '摄氏度' : unit === 'fahrenheit' ? '华氏度' : '开氏度'}
                      </span>
                      <div className="text-2xl font-bold text-gray-800">
                        {values[unit]} {unit === 'celsius' ? '°C' : unit === 'fahrenheit' ? '°F' : 'K'}
                      </div>
                    </div>
                    <button
                      onClick={() => handleCopy(values[unit])}
                      className={`p-2 rounded-lg transition-all duration-200 ${
                        copied 
                          ? 'bg-green-100 text-green-600' 
                          : 'hover:bg-gray-100 text-gray-600'
                      }`}
                      title="复制结果"
                    >
                      {copied ? <Check size={24} /> : <Copy size={24} />}
                    </button>
                  </div>
                </div>
              )
            ))}
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">常见温度参考点：</h3>
            <div className="space-y-2">
              {REFERENCE_POINTS.map((point, index) => (
                <div
                  key={index}
                  className="text-sm p-3 bg-white/50 rounded-xl border border-gray-200 flex justify-between items-center cursor-pointer hover:bg-blue-50 hover:border-blue-200 transition-all duration-200"
                  onClick={() => {
                    setFromUnit('celsius');
                    setTemperature(point.temp.toString());
                  }}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-lg">{point.icon}</span>
                    <span className="font-medium">{point.desc}</span>
                  </span>
                  <span className="font-mono font-medium text-gray-600">{point.temp}°C</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;