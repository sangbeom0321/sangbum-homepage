export interface Patent {
  title: string;
  status: "registered" | "pending";
  url?: string;
}

export const patents: Patent[] = [
  {
    title: "실시간 스트리밍 방송 채팅 요약 시스템 및 방법",
    status: "registered",
    url: "https://www.kipris.or.kr/khome/detail/newWindow.do",
  },
];
