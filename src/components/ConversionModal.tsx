import { useState } from 'react';
import PaymentInput from './PaymentInput';
import { CryptoIcons } from './CryptoIcons';
import WalletField from './WalletField';
import PrimaryButton from './PrimaryButton';

interface ConversionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConversionModal({ isOpen, onClose }: ConversionModalProps) {
  const [activeTab, setActiveTab] = useState('crypto-to-cash');
  const [payAmount, setPayAmount] = useState(1.00);
  const [receiveAmount, setReceiveAmount] = useState(1.00);
  const [payCurrency, setPayCurrency] = useState('ETH');
  const [receiveCurrency, setReceiveCurrency] = useState('NGN');
  const [payFrom, setPayFrom] = useState('');
  const [payTo, setPayTo] = useState('');

  const tabs = [
    { id: 'crypto-to-cash', label: 'Crypto to cash' },
    { id: 'cash-to-crypto', label: 'Cash to crypto' },
    { id: 'crypto-to-fiat', label: 'Crypto to fiat loan' },
  ];

  if (!isOpen) return null;

  const handleConvert = () => {
    console.log({
      type: activeTab,
      payAmount,
      payCurrency,
      receiveAmount,
      receiveCurrency,
      payFrom,
      payTo,
    });
    // Add your conversion logic here
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-160 h-180 bg-white rounded-[30px] shadow-lg p-2 sm:py-10 sm:px-16 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
          aria-label="Close modal"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Tabs */}
        <div className="flex w-90% max-w-98 m-auto justify-between bg-[#F2F2F2] rounded-full mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm transition ${
                activeTab === tab.id
                  ? 'bg-[#013941] text-white'
                  : 'bg-[#F2F2F2] text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Payment Inputs */}
        <div className="space-y-4 mb-6">
          <PaymentInput
            label="You pay"
            value={payAmount}
            onChange={setPayAmount}
            onCurrencyChange={setPayCurrency}
            currencyOptions={[
              { value: 'ETH', label: 'ETH', icon: CryptoIcons.ETH },
              { value: 'BTC', label: 'BTC', icon: CryptoIcons.BTC },
              { value: 'USDT', label: 'USDT', icon: CryptoIcons.USDT },
              {value: 'CELO', label: 'CELO', icon: CryptoIcons.CELO},
              {value: 'BNB', label: 'BNB', icon: CryptoIcons.BNB},
              {value: 'TON', label: 'TON', icon: CryptoIcons.TON},
            ]}
            defaultCurrency="ETH"
          />

          <PaymentInput
            label="You receive"
            value={receiveAmount}
            onChange={setReceiveAmount}
            onCurrencyChange={setReceiveCurrency}
            currencyOptions={[
              { value: 'NGN', label: 'NGN', icon: CryptoIcons.NGN },
              { value: 'USD', label: 'USD', icon: CryptoIcons.USD },
              { value: 'EUR', label: 'EUR', icon: CryptoIcons.EUR },
            ]}
            defaultCurrency="NGN"
          />
        </div>

        {/* Pay From Select */}
        <WalletField
          label="Pay from"
          options={[
            { value: 'metamask', label: 'Metamask', icon: CryptoIcons.Metamask },
            { value: 'rainbow', label: 'Rainbow', icon: CryptoIcons.Rainbow },
            { value: 'walletconnect', label: 'WalletConnect', icon: CryptoIcons.WalletConnect },
            { value: 'other', label: 'Other Crypto Wallets (Binance, Coinbase, Bybit etc)', icon: CryptoIcons.OtherWallets },
          ]}
          value={payFrom}
          onChange={setPayFrom}
          placeholder="Select wallet"
          className="mb-4"
        />

        {/* Pay To Select */}
        <WalletField
          label="Pay to"
          options={[
            { value: 'metamask', label: 'Bank App', icon: CryptoIcons.Metamask },
          ]}
          value={payTo}
          onChange={setPayTo}
          placeholder="Select wallet"
          className="mb-6"
        />

        {/* Convert Button */}
        <PrimaryButton text="Convert now" onClick={handleConvert} />
      </div>
    </div>
  );
}
