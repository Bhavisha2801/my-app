import React, { useState, useEffect } from "react";
import moment from "moment-timezone";

const LanguageSelectionComponent: React.FC<{ items: string[] }> = ({ items }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [selectedTimeZone, setSelectedTimeZone] = useState<string>("");
  const [currentTime, setCurrentTime] = useState<string>("");
  const [filteredTimeZones, setFilteredTimeZones] = useState<string[]>([]);
  const [country, setCountry] = useState<string>("");

  useEffect(() => {
    if (selectedLanguage) {
      getCountryAndTimeZones(selectedLanguage);
    }
  }, [selectedLanguage]);

  useEffect(() => {
    if (selectedTimeZone) {
      logCurrentTime(selectedTimeZone);
    }
  }, [selectedTimeZone]);

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(event.target.value);
    setSelectedTimeZone(""); // Reset timezone when language changes
  };

  const handleTimeZoneChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTimeZone(event.target.value);
  };

  const getCountryAndTimeZones = (lng: string) => {
    const countryCode = lng.split('-')[1];
    if (countryCode) {
      setCountry(new Intl.DisplayNames([lng], { type: "region" }).of(countryCode) || countryCode);
      const timeZones = [
        ...new Set([
          ...moment.tz.zonesForCountry(countryCode) || [],
        //   ...moment.tz.names().filter(tz => tz.includes(countryCode)),
          ...moment.tz.names().filter(tz => tz.toLowerCase().includes(countryCode.toLowerCase()))
        ])
      ];
      setFilteredTimeZones(timeZones);
    } else {
      setCountry("Unknown");
      setFilteredTimeZones([]);
    }
  };

  const logCurrentTime = (tz: string) => {
    const formattedTime = moment.tz(new Date(), tz).format("DD/MM/YYYY HH:mm:ss");
    console.log(`Current time in ${tz}:`, formattedTime);
    setCurrentTime(formattedTime);
  };

  return (
    <div className="container">
      <h2 className="title">Please Select Language and then Time Zone for Specific Time</h2>
      <div className="selection-container">
        <div className="dropdown-container">
          <label htmlFor="language-select">Select Language</label>
          <select id="language-select" value={selectedLanguage} onChange={handleLanguageChange}>
            <option value="" disabled>Select Language</option>
            {items.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>
        <div className="dropdown-container">
          <label htmlFor="timezone-select">Select Timezone</label>
          <select id="timezone-select" value={selectedTimeZone} onChange={handleTimeZoneChange} disabled={!selectedLanguage}>
            <option value="" disabled>Select TimeZone</option>
            {filteredTimeZones.map((tz) => (
              <option key={tz} value={tz}>{tz}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="info-container">
        <div className="info-box">
          <h3>Timezone Date & Time:</h3>
          <p>{currentTime || "Select Language and TimeZone to see the time"}</p>
        </div>
        <div className="info-box">
          <h3>Country:</h3>
          <p>{country || "Select a language"}</p>
        </div>
      </div>
    </div>
  );
};






// import React, { useState, useEffect } from "react";
// import moment from 'moment-timezone';

// const LanguageSelectionComponent: React.FC<{ items: string[] }> = ({ items }) => {
//   const [selectedLanguage, setSelectedLanguage] = useState<string>("");
//   const [selectedTimeZone, setSelectedTimeZone] = useState<string>("");
//   const [currentTime, setCurrentTime] = useState<string>("");
//   const [filteredTimeZones, setFilteredTimeZones] = useState<string[]>([]);
//   const [country, setCountry] = useState<string>('');

//   useEffect(() => {
//     if (selectedLanguage) {
//       filterTimeZones(selectedLanguage);
//     }
//   }, [selectedLanguage]);

//   useEffect(() => {
//     if (selectedLanguage && selectedTimeZone) {
//       logCurrentTime(selectedLanguage, selectedTimeZone);
//     }
//   }, [selectedLanguage, selectedTimeZone]);

//   const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedLanguage(event.target.value);
//     setSelectedTimeZone(""); // Reset timezone when language changes
//   };

//   const handleTimeZoneChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedTimeZone(event.target.value);
//   };

//   const filterTimeZones = (lng: string) => {
//     const allTimeZones = moment.tz.names();
//     const region = lng.split("-")[1]; // Extract region code from locale
//     const matchingZones = allTimeZones.filter((tz) => tz.includes(region));
//     const anotherzones = moment.tz.zonesForCountry(region) || []
//     setCountry(new Intl.DisplayNames([lng], { type: "region" }).of(region) || region);
//     console.log(matchingZones, anotherzones, '------', moment.tz.zonesForCountry(country))
//     setFilteredTimeZones(matchingZones);
//   };

//   const logCurrentTime = (lng: string, tz: string) => {
//     const formattedTime = new Intl.DateTimeFormat(lng, {
//       timeZone: tz,
//       year: "numeric",
//       month: "numeric",
//       day: "numeric",
//       hour: "numeric",
//       minute: "numeric",
//       second: "numeric",
//     }).format(new Date());
//     console.log(`Current time in ${lng} (${tz}):`, formattedTime);
//     setCurrentTime(formattedTime);
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "20px" }}>
//       <h2>Select Language</h2>
//       <select id="language-select" value={selectedLanguage} onChange={handleLanguageChange}>
//         <option value="" disabled>Select Language</option>
//         {items.map((item) => (
//           <option key={item} value={item}>{item}</option>
//         ))}
//       </select>
//       <br /><br />
//       <h2>Select TimeZone</h2>
//       <select id="timezone-select" value={selectedTimeZone} onChange={handleTimeZoneChange} disabled={!selectedLanguage}>
//         <option value="" disabled>Select TimeZone</option>
//         {filteredTimeZones.map((tz) => (
//           <option key={tz} value={tz}>{tz}</option>
//         ))}
//       </select>
//       <br /><br />
//       <h3>Current Time:</h3>
//       <p>{currentTime || "Select Language and TimeZone to see the time"}</p>
//     </div>
//   );
// };


export default LanguageSelectionComponent;