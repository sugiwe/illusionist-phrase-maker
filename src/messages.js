const DASHES_PER_LINE = 80

export const messages = {
  longLine: `-`.repeat(DASHES_PER_LINE),
  welcome: `(★-_-★) < ようこそ Illusionist Phrase Maker へ♠

キミが入力した文章をボクが言ってるみたいに変換しちゃうよ♥
キミが考えた文章や、キミの好きな小説の一部などを変換してみよう♦
「。」を変換していくから、適度に「。」の入った文章にしてね♥
「。」の無い文章は変換できないから気をつけよう♣`,
  prompt: `この下にテキストを入力してね♣
入力し終わったら、最後に改行して「Ctrl+D」を入力してね♠`,
  interrupt: `(★-_-★) < あれ、おしまいにするの？また遊んでね♥`,
  noTransform: `あれ、変換する部分がないよ♣
「。」の入った文章を入れてね♠`,
  processing: `入力ありがとう♦
じゃあ変換するね♣`,
  transformed: `変換できたよ♥`,
  repeat: `もう一度やるかい？それとも終わりにするかい？`,
  goodbye: `(★-_-★) < バイバイ♣また遊んでね♥`,
};
