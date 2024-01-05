

const useEthAmountParser = (value: string, decimalPlaces: number) => parseFloat((parseInt(value, 16) / Math.pow(10, 18)).toString()).toFixed(decimalPlaces)

export default useEthAmountParser