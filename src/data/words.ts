export interface ChineseWord {
  chinese: string;
  pinyin: string;
  english: string;
}

export const CHINESE_WORDS: ChineseWord[] = [
  { chinese: '你好', pinyin: 'Nǐ hǎo', english: 'Hello' },
  { chinese: '谢谢', pinyin: 'Xièxiè', english: 'Thank you' },
  { chinese: '再见', pinyin: 'Zàijiàn', english: 'Goodbye' },
  { chinese: '早上好', pinyin: 'Zǎoshang hǎo', english: 'Good morning' },
  { chinese: '晚安', pinyin: 'Wǎn\'ān', english: 'Good night' }
];