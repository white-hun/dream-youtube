import { format, register } from "timeago.js";
import koLocale from "timeago.js/lib/lang/ko";

register("ko", koLocale);

export function formatAgo(date, lang = "en_US") {
  return format(date, lang);
}

// 언어를 변경하고 싶으면 register를 사용한다
// 사용하고 싶은 언어의 locale을 가지고 온다
// 그 후 format 두번째 인자에 언어를 적어주면 된다
