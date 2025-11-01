
/**
 * Provides a realistic mock translation for development and testing
 * @param text The text to translate
 * @param targetLang The target language
 * @returns A realistic mocked translation
 */
export const getRealisticMockTranslation = (text: string, targetLang: string): string => {
  // If there's no text to translate, return empty string
  if (!text || text.trim() === '') {
    return '';
  }
  
  // More comprehensive mock translations for common phrases
  const mockTranslations: Record<string, Record<string, string>> = {
    "Hello": {
      "ES": "Hola",
      "FR": "Bonjour",
      "DE": "Hallo",
      "IT": "Ciao",
      "ZH": "你好",
      "JA": "こんにちは"
    },
    "How are you?": {
      "ES": "¿Cómo estás?",
      "FR": "Comment ça va?",
      "DE": "Wie geht es dir?",
      "IT": "Come stai?",
      "ZH": "你好吗？",
      "JA": "お元気ですか？"
    },
    "Thank you": {
      "ES": "Gracias",
      "FR": "Merci",
      "DE": "Danke",
      "IT": "Grazie",
      "ZH": "谢谢",
      "JA": "ありがとう"
    },
    "Welcome to our video": {
      "ES": "Bienvenido a nuestro video",
      "FR": "Bienvenue à notre vidéo",
      "DE": "Willkommen zu unserem Video",
      "IT": "Benvenuto al nostro video",
      "ZH": "欢迎观看我们的视频",
      "JA": "私たちの動画へようこそ"
    },
    "Okay, I'm ready.": {
      "ES": "Bien, estoy listo.",
      "FR": "D'accord, je suis prêt.",
      "DE": "Okay, ich bin bereit.",
      "IT": "Ok, sono pronto.",
      "ZH": "好的，我准备好了。",
      "JA": "はい、準備ができました。"
    },
    "Let's get started.": {
      "ES": "Comencemos.",
      "FR": "Commençons.",
      "DE": "Lass uns anfangen.",
      "IT": "Iniziamo.",
      "ZH": "让我们开始吧。",
      "JA": "始めましょう。"
    },
    "Please subscribe to our channel.": {
      "ES": "Por favor suscríbase a nuestro canal.",
      "FR": "Veuillez vous abonner à notre chaîne.",
      "DE": "Bitte abonnieren Sie unseren Kanal.",
      "IT": "Iscriviti al nostro canale.",
      "ZH": "请订阅我们的频道。",
      "JA": "チャンネル登録をお願いします。"
    },
    "go to home": {
      "ES": "ir a inicio",
      "FR": "aller à l'accueil",
      "DE": "zur Startseite gehen",
      "IT": "vai alla home",
      "ZH": "去首页",
      "JA": "ホームに行く"
    },
    "New subtitle text": {
      "ES": "Nuevo texto de subtítulo",
      "FR": "Nouveau texte de sous-titre",
      "DE": "Neuer Untertiteltext",
      "IT": "Nuovo testo sottotitolo",
      "ZH": "新字幕文本",
      "JA": "新しい字幕テキスト"
    },
    "now it is create": {
      "ES": "ahora está creado",
      "FR": "maintenant c'est créé",
      "DE": "jetzt ist es erstellt",
      "IT": "ora è creato",
      "ZH": "现在已创建",
      "JA": "今作成されました"
    },
    "create one video": {
      "ES": "crear un video",
      "FR": "créer une vidéo",
      "DE": "ein Video erstellen",
      "IT": "creare un video",
      "ZH": "创建一个视频",
      "JA": "一つの動画を作成する"
    },
    "subtitle segment two": {
      "ES": "segmento de subtítulo dos",
      "FR": "segment de sous-titre deux", 
      "DE": "Untertitelsegment zwei",
      "IT": "segmento sottotitolo due",
      "ZH": "字幕段落二",
      "JA": "字幕セグメント2"
    },
    "subtitle segment three": {
      "ES": "segmento de subtítulo tres",
      "FR": "segment de sous-titre trois",
      "DE": "Untertitelsegment drei",
      "IT": "segmento sottotitolo tre",
      "ZH": "字幕段落三",
      "JA": "字幕セグメント3"
    },
    "subtitle segment four": {
      "ES": "segmento de subtítulo cuatro",
      "FR": "segment de sous-titre quatre",
      "DE": "Untertitelsegment vier",
      "IT": "segmento sottotitolo quattro",
      "ZH": "字幕段落四",
      "JA": "字幕セグメント4"
    }
  };
  
  // Check if we have a mock translation for this text
  if (mockTranslations[text] && mockTranslations[text][targetLang]) {
    return mockTranslations[text][targetLang];
  }
  
  // Just return the original text without language suffix
  return text;
};
