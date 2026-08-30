import { WordSearchPuzzle } from '../types';

export const wordSearchPuzzles: WordSearchPuzzle[] = [
  {
    id: 'ws_fruits',
    title: 'Fruits of the Spirit',
    titleTl: 'Bunga ng Espiritu',
    category: 'Christian Character',
    categoryTl: 'Kristiyanong Pagkatao',
    gridSize: 10,
    words: ['LOVE', 'JOY', 'PEACE', 'PATIENCE', 'KINDNESS', 'GOODNESS', 'FAITH'],
    grid: [
      ['P', 'A', 'T', 'I', 'E', 'N', 'C', 'E', 'L', 'J'],
      ['K', 'I', 'N', 'D', 'N', 'E', 'S', 'S', 'O', 'O'],
      ['F', 'A', 'I', 'T', 'H', 'B', 'M', 'P', 'V', 'Y'],
      ['G', 'O', 'O', 'D', 'N', 'E', 'S', 'S', 'E', 'T'],
      ['W', 'P', 'E', 'A', 'C', 'E', 'X', 'Y', 'Z', 'A'],
      ['B', 'C', 'D', 'L', 'O', 'V', 'E', 'R', 'S', 'T'],
      ['H', 'O', 'P', 'E', 'F', 'U', 'L', 'N', 'E', 'S'],
      ['G', 'R', 'A', 'C', 'E', 'M', 'E', 'R', 'C', 'Y'],
      ['J', 'E', 'S', 'U', 'S', 'L', 'I', 'G', 'H', 'T'],
      ['T', 'R', 'U', 'T', 'H', 'S', 'P', 'I', 'R', 'I']
    ],
    clues: {
      LOVE: 'The greatest Christian virtue (Galatians 5:22)',
      JOY: 'Delight in the Lord regardless of circumstances',
      PEACE: 'Calm trust that passes understanding',
      PATIENCE: 'Longsuffering and endurance under trial',
      KINDNESS: 'Gentle warmth and benevolent deeds',
      GOODNESS: 'Moral excellence and upright integrity',
      FAITH: 'Unwavering confidence in God\'s promises'
    },
    cluesTl: {
      LOVE: 'Ang pinakadakilang katangian ng Kristiyano (Pag-ibig)',
      JOY: 'Kagalakan sa Panginoon sa anumang kalagayan',
      PEACE: 'Payapang pagtitiwala na higit sa lahat ng pang-unawa',
      PATIENCE: 'Pagtitiis at katatagan sa gitna ng pagsubok',
      KINDNESS: 'Kagandahang-loob at mapagkalingang gawa',
      GOODNESS: 'Kabutihan at matuwid na pamumuhay',
      FAITH: 'Matibay na pananampalataya sa mga pangako ng Diyos'
    }
  },
  {
    id: 'ws_pioneers',
    title: 'Adventist Pioneers',
    titleTl: 'Mga Pioneer ng Simbahang Adventista',
    category: 'Church History',
    categoryTl: 'Kasaysayan ng Simbahan',
    gridSize: 10,
    words: ['WHITE', 'BATES', 'ANDREWS', 'MILLER', 'EDSON', 'BYINGTON', 'SMITH'],
    grid: [
      ['A', 'N', 'D', 'R', 'EWS', 'B', 'A', 'T', 'E', 'S'],
      ['W', 'H', 'I', 'T', 'E', 'L', 'L', 'E', 'N', 'M'],
      ['M', 'I', 'L', 'L', 'E', 'R', 'P', 'I', 'O', 'I'],
      ['E', 'D', 'S', 'O', 'N', 'H', 'I', 'R', 'A', 'L'],
      ['B', 'Y', 'I', 'N', 'G', 'T', 'O', 'N', 'J', 'L'],
      ['S', 'M', 'I', 'T', 'H', 'U', 'R', 'I', 'A', 'E'],
      ['H', 'E', 'W', 'I', 'T', 'T', 'D', 'A', 'V', 'R'],
      ['B', 'A', 'T', 'T', 'L', 'E', 'C', 'R', 'E', 'E'],
      ['H', 'A', 'RMON', 'Y', 'F', 'A', 'I', 'T', 'H'],
      ['A', 'D', 'V', 'E', 'N', 'T', 'I', 'S', 'T', 'S']
    ].map(row => row.slice(0, 10).map(c => c.length > 1 ? c[0] : c)),
    clues: {
      WHITE: 'Ellen & James White, pioneering co-founders',
      BATES: 'Joseph Bates, champion of the Seventh-day Sabbath',
      ANDREWS: 'J.N. Andrews, first official foreign missionary',
      MILLER: 'William Miller, leader of the Advent awakening',
      EDSON: 'Hiram Edson, Sanctuary insight on Oct 23, 1844',
      BYINGTON: 'John Byington, first GC President (1863)',
      SMITH: 'Uriah Smith, longtime editor and prophetic author'
    },
    cluesTl: {
      WHITE: 'Ellen at James White, mga tagapagtatag ng kilusan',
      BATES: 'Joseph Bates, tagapagtaguyod ng Ikapitong Araw ng Sabbath',
      ANDREWS: 'J.N. Andrews, unang opisyal na misyonero sa ibang bansa',
      MILLER: 'William Miller, pinuno ng unang kilusang Advent',
      EDSON: 'Hiram Edson, nakatuklas sa Santuwaryo noong Okt 23, 1844',
      BYINGTON: 'John Byington, unang Pangulo ng General Conference (1863)',
      SMITH: 'Uriah Smith, matagal na editor at manunulat ng mga aklat sa propesiya'
    }
  },
  {
    id: 'ws_books',
    title: 'Books of the Bible',
    titleTl: 'Mga Aklat ng Bibliya',
    category: 'Scripture',
    categoryTl: 'Banal na Kasulatan',
    gridSize: 10,
    words: ['GENESIS', 'EXODUS', 'DANIEL', 'MATTHEW', 'ROMANS', 'PSALMS'],
    grid: [
      ['G', 'E', 'N', 'E', 'S', 'I', 'S', 'A', 'B', 'C'],
      ['E', 'X', 'O', 'D', 'U', 'S', 'D', 'E', 'F', 'G'],
      ['D', 'A', 'N', 'I', 'E', 'L', 'H', 'I', 'J', 'K'],
      ['M', 'A', 'T', 'T', 'H', 'E', 'W', 'L', 'M', 'N'],
      ['R', 'O', 'M', 'A', 'N', 'S', 'O', 'P', 'Q', 'R'],
      ['P', 'S', 'A', 'L', 'M', 'S', 'S', 'T', 'U', 'V'],
      ['B', 'I', 'B', 'L', 'E', 'W', 'O', 'R', 'D', 'S'],
      ['T', 'R', 'U', 'T', 'H', 'L', 'I', 'G', 'H', 'T'],
      ['G', 'O', 'S', 'P', 'E', 'L', 'H', 'O', 'P', 'E'],
      ['F', 'A', 'I', 'T', 'H', 'L', 'O', 'V', 'E', 'S']
    ],
    clues: {
      GENESIS: 'Book of origins and Creation',
      EXODUS: 'Deliverance from Egypt and the Ten Commandments',
      DANIEL: 'Apocalyptic visions and end-time prophecies',
      MATTHEW: 'Gospel presenting Jesus as King of the Jews',
      ROMANS: 'Paul’s masterpiece on justification by faith',
      PSALMS: 'Sacred hymns and songs of David and Asaph'
    },
    cluesTl: {
      GENESIS: 'Aklat ng pasimula at Paglalang ng sanlibutan',
      EXODUS: 'Pagpapalaya mula sa Ehipto at Sampung Utos',
      DANIEL: 'Mga pangitain at propesiya para sa huling araw',
      MATTHEW: 'Ebanghelyo na nagpapakilala kay Hesus bilang Hari',
      ROMANS: 'Sulat ni Pablo ukol sa pagpapawalang-sala sa pananampalataya',
      PSALMS: 'Mga banal na awit at papuri ni David at Asaf'
    }
  }
];
