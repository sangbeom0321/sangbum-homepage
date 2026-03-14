export interface MediaItem {
  title: string;
  source: string;
  url: string;
  type: "article" | "video";
  year: number;
  thumbnailUrl?: string;
}

export const media: MediaItem[] = [
  {
    title: "한기대, '2023 대학생 창작 모빌리티 경진대회' 대상·금상 수상",
    source: "대전투데이",
    url: "https://www.dtnews24.com/news/articleView.html?idxno=756488",
    type: "article",
    year: 2023,
  },
  {
    title: "한기대, '국제 대학생 창작 자동차 경진대회'서 금상 수상",
    source: "대한경제",
    url: "https://www.dnews.co.kr/uhtml/view.jsp?idxno=202211071501498870302",
    type: "article",
    year: 2022,
  },
  {
    title: "한기대, 로봇과 자율주행 분야 각종 대회서 두각",
    source: "네이트 뉴스",
    url: "https://news.nate.com/view/20231018n25478",
    type: "article",
    year: 2023,
  },
  {
    title: "우아한형제들, '배민 로봇배달 챌린지' 성료",
    source: "로봇신문",
    url: "https://www.irobotnews.com/news/articleView.html?idxno=36491",
    type: "article",
    year: 2024,
  },
  {
    title: "교내 자율주행차 연구회 홍보 영상",
    source: "YouTube (K-ROAD)",
    url: "https://www.youtube.com/watch?v=6hWPmb7_xOA",
    type: "video",
    year: 2022,
  },
  {
    title: "2023 현대 자율주행챌린지 Virtual Track",
    source: "YouTube",
    url: "https://www.youtube.com/watch?v=8tb0thwQkFw",
    type: "video",
    year: 2023,
  },
  {
    title: "대외 홍보 영상 MBC",
    source: "MBC",
    url: "https://www.youtube.com/watch?v=tLKn4aOPReE&t=297s",
    type: "video",
    year: 2023,
  },
];
