export const getRegionOptions = (CountryRegionData, country) => {
  const index = CountryRegionData.findIndex((region) => region[0] === country);
  return CountryRegionData[index][2].split('|').map((region) => region.substring(0, region.indexOf('~')));
};


export const getFlag = (countryCode: any) => {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char: any) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
};