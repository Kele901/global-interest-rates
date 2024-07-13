import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';

// Sample data for global countries (replace with actual historical data)
const globalInterestRateData = [
  { year: 1971, USA: 5.72, Canada: 5.2, France: 6.5, Germany: 7.1, Italy: 6.8, Japan: 6.3, UK: 6.1, Australia: 5.8, Mexico: 8.1, SouthKorea: 23.0, Spain: 8.0, Sweden: 6.4, Switzerland: 4.2, Turkey: 8.5, Nigeria: 4.5, China: 3.8, USSR: 2.0, Brazil: 15.0, Chile: 20.0, Argentina: 30.0, India: 4.8, Norway: 5.5 },
  { year: 1980, USA: 13.35, Canada: 12.8, France: 12.1, Germany: 9.5, Italy: 16.9, Japan: 7.8, UK: 16.2, Australia: 10.6, Mexico: 28.1, SouthKorea: 20.0, Spain: 16.5, Sweden: 11.3, Switzerland: 5.1, Turkey: 26.0, Nigeria: 7.5, China: 5.0, USSR: 2.0, Brazil: 115.0, Chile: 47.0, Argentina: 80.0, India: 6.5, Norway: 9.5 },
  { year: 1990, USA: 8.55, Canada: 10.8, France: 9.9, Germany: 8.5, Italy: 12.2, Japan: 7.0, UK: 13.9, Australia: 14.5, Mexico: 37.1, SouthKorea: 14.0, Spain: 14.7, Sweden: 13.7, Switzerland: 8.3, Turkey: 54.0, Nigeria: 25.5, China: 9.0, Russia: 5.0, Brazil: 5000.0, Chile: 40.0, Argentina: 1500.0, India: 10.0, Norway: 11.5 },
  { year: 2000, USA: 6.24, Canada: 5.7, France: 4.2, Germany: 4.7, Italy: 4.5, Japan: 1.7, UK: 6.1, Australia: 6.2, Mexico: 16.9, SouthKorea: 7.9, Spain: 4.4, Sweden: 4.1, Switzerland: 3.4, Turkey: 38.0, Nigeria: 13.5, China: 2.25, Russia: 25.0, Brazil: 17.0, Chile: 10.0, Argentina: 11.0, India: 8.0, Norway: 6.7 },
  { year: 2010, USA: 3.25, Canada: 1.0, France: 1.0, Germany: 1.0, Italy: 1.0, Japan: 0.1, UK: 0.5, Australia: 4.7, Mexico: 4.4, SouthKorea: 2.5, Spain: 1.0, Sweden: 0.5, Switzerland: 0.5, Turkey: 15.0, Nigeria: 6.25, China: 5.81, Russia: 7.75, Brazil: 10.75, Chile: 3.25, Argentina: 12.0, India: 6.5, Norway: 2.5 },
  { year: 2020, USA: 0.38, Canada: 0.5, France: 0.0, Germany: 0.0, Italy: 0.0, Japan: -0.1, UK: 0.1, Australia: 0.1, Mexico: 4.3, SouthKorea: 0.5, Spain: 0.0, Sweden: 0.0, Switzerland: -0.7, Turkey: 17.0, Nigeria: 11.5, China: 3.85, Russia: 4.25, Brazil: 2.0, Chile: 0.5, Argentina: 38.0, India: 4.0, Norway: 0.0 },
  { year: 2023, USA: 5.33, Canada: 4.5, France: 3.5, Germany: 3.5, Italy: 3.5, Japan: -0.1, UK: 4.5, Australia: 4.1, Mexico: 11.25, SouthKorea: 3.5, Spain: 3.5, Sweden: 3.5, Switzerland: 1.75, Turkey: 45.0, Nigeria: 18.0, China: 3.65, Russia: 7.5, Brazil: 13.75, Chile: 11.25, Argentina: 97.0, India: 6.5, Norway: 3.75 },
];

const countryColors = {
  USA: "#8884d8", Canada: "#82ca9d", France: "#ffc658", Germany: "#ff8042", Italy: "#a4de6c", 
  Japan: "#d0ed57", UK: "#83a6ed", Australia: "#ff7300", Mexico: "#e60049", SouthKorea: "#0bb4ff", 
  Spain: "#50e991", Sweden: "#e6d800", Switzerland: "#9b19f5", Turkey: "#dc0ab4", Nigeria: "#00bfa0",
  China: "#b3d4ff", Russia: "#fd7f6f", Brazil: "#7eb0d5", Chile: "#b2e061", Argentina: "#bd7ebe",
  India: "#ff9ff3", Norway: "#45aaf2"
};

const InterestRateSummary = ({ isDarkMode }) => (
  <div className={`p-4 rounded-md mb-4 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-blue-50 text-gray-800'}`}>
    <p className="text-sm">
      This chart displays historical interest rates for various countries. Interest rates represent the cost of borrowing money and are set by central banks to manage inflation and economic growth. Higher rates generally slow economic activity, while lower rates stimulate borrowing and spending. Interest rates influence various aspects of an economy, including mortgage rates, savings accounts, and currency values.
    </p>
  </div>
);

const GlobalInterestRateApp = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [selectedCountries, setSelectedCountries] = useState(Object.keys(countryColors).slice(0, 9));
  const [searchTerm, setSearchTerm] = useState('');
  const [maxYAxis, setMaxYAxis] = useState(20);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const filterData = (period) => {
    const currentYear = new Date().getFullYear();
    switch (period) {
      case '20years':
        return globalInterestRateData.filter(item => item.year >= currentYear - 20);
      case '10years':
        return globalInterestRateData.filter(item => item.year >= currentYear - 10);
      case '5years':
        return globalInterestRateData.filter(item => item.year >= currentYear - 5);
      default:
        return globalInterestRateData;
    }
  };

  const handlePeriodChange = (value) => {
    setSelectedPeriod(value);
  };

  const handleCountryToggle = (country) => {
    setSelectedCountries(prev =>
      prev.includes(country)
        ? prev.filter(c => c !== country)
        : [...prev, country]
    );
  };

  const filteredCountries = Object.keys(countryColors).filter(country =>
    country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className={`w-full max-w-4xl mx-auto ${isDarkMode ? 'bg-gray-800 text-white' : ''}`}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className={isDarkMode ? 'text-white' : ''}>Global Interest Rates</CardTitle>
            <CardDescription className={isDarkMode ? 'text-gray-300' : ''}>Interest Rates from 1971 to Present</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <span>Light</span>
            <Switch
              checked={isDarkMode}
              onCheckedChange={setIsDarkMode}
              aria-label="Toggle dark mode"
            />
            <span>Dark</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <InterestRateSummary isDarkMode={isDarkMode} />
        <div className="mb-4 space-y-4">
          <div className="flex justify-between items-center">
            <Select onValueChange={handlePeriodChange} defaultValue={selectedPeriod}>
              <SelectTrigger className={`w-[180px] ${isDarkMode ? 'bg-gray-700 text-white' : ''}`}>
                <SelectValue placeholder="Select time period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="20years">Last 20 Years</SelectItem>
                <SelectItem value="10years">Last 10 Years</SelectItem>
                <SelectItem value="5years">Last 5 Years</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="text"
              placeholder="Search countries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-[200px] ${isDarkMode ? 'bg-gray-700 text-white' : ''}`}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Label htmlFor="maxYAxis" className={isDarkMode ? 'text-white' : ''}>Max Y-Axis Value:</Label>
            <Input
              id="maxYAxis"
              type="number"
              value={maxYAxis}
              onChange={(e) => setMaxYAxis(Number(e.target.value))}
              className={`w-[100px] ${isDarkMode ? 'bg-gray-700 text-white' : ''}`}
            />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {filteredCountries.map(country => (
              <div key={country} className="flex items-center space-x-2">
                <Checkbox
                  id={country}
                  checked={selectedCountries.includes(country)}
                  onCheckedChange={() => handleCountryToggle(country)}
                />
                <Label htmlFor={country} className={isDarkMode ? 'text-white' : ''}>{country}</Label>
              </div>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={filterData(selectedPeriod)} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#555' : '#ccc'} />
            <XAxis dataKey="year" stroke={isDarkMode ? '#fff' : '#666'} />
            <YAxis domain={[0, maxYAxis]} stroke={isDarkMode ? '#fff' : '#666'} />
            <Tooltip contentStyle={isDarkMode ? { backgroundColor: '#333', border: 'none', color: '#fff' } : undefined} />
            <Legend />
            {selectedCountries.map(country => (
              <Line
                key={country}
                type="monotone"
                dataKey={country}
                stroke={countryColors[country]}
                activeDot={{ r: 8 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default GlobalInterestRateApp;