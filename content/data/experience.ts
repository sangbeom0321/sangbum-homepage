export interface Experience {
  organization: string;
  role: string;
  period: string;
  description: string;
  type: "research" | "work" | "club";
  url?: string;
  highlights?: string[];
}

export const experience: Experience[] = [
  {
    organization: "한국기계연구원 (KIMM)",
    role: "자율주행 SW 아키텍처 설계 참여 연구원",
    period: "2023.04 ~ 2026.02",
    description:
      "과수 농장 자율 농업기계 기술개발 프로젝트. SLAM 기반 매핑, Voronoi 내비게이션, 전체 자율주행 SW 아키텍처 설계 참여.",
    type: "research",
    url: "https://www.kimm.re.kr",
    highlights: [
      "Topology-preserving incremental mapping 알고리즘 개발",
      "Voronoi 기반 과수원 열간 경로 생성",
      "ROS2 기반 자율주행 SW 아키텍처 설계",
      "실차(UGV) 테스트 및 현장 실험",
    ],
  },
  {
    organization: "KOREATECH HPC Lab → SPIN",
    role: "석사과정 연구원",
    period: "2023.08 ~ 2026.02",
    description:
      "SLAM 병렬화 연구, 멀티 로봇 탐색 경로 생성, 자율주행 시스템 연구.",
    type: "research",
    url: "https://sites.google.com/view/hpclab/",
    highlights: [
      "SLAM 병렬화를 통한 실시간 지도 생성 연구",
      "멀티 UGV 공간 분할 기반 탐색 경로 생성",
      "IEEE Access, ICROS 논문 투고",
    ],
  },
  {
    organization: "K-ROAD (교내 자율주행차 연구회)",
    role: "대표 / 경로생성·판단 파트장",
    period: "2021.03 ~ 2023.08",
    description:
      "3년간 연구회 대표로 활동하며 교내 자율주행 연구 기반 구축. 대학생 창작 자동차 경진대회, 현대 자율주행 챌린지 등 참가.",
    type: "club",
    highlights: [
      "자율주행 경로생성/판단 알고리즘 개발",
      "창작자동차경진대회 은상 (2022)",
      "현대 자율주행챌린지 Virtual Track 참가 (2023)",
      "후배 멘토링 및 연구회 운영",
    ],
  },
];
