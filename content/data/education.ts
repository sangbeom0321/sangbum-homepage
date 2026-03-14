export interface Education {
  institution: string;
  institutionShort?: string;
  degree: string;
  department: string;
  period: string;
  gpa?: string;
  status: "current" | "completed" | "upcoming";
  url?: string;
}

export const education: Education[] = [
  {
    institution: "Hanyang University",
    degree: "PhD",
    department: "미래자동차공학과 (AUTO Lab)",
    period: "2026.03 ~",
    status: "upcoming",
    url: "https://autolab.hanyang.ac.kr/",
  },
  {
    institution: "Korea University of Technology and Education (KOREATECH)",
    institutionShort: "KOREATECH",
    degree: "MS",
    department: "컴퓨터공학과 미래융합공학전공 (HPC Lab → SPIN)",
    period: "2023.08 ~ 2026.02",
    gpa: "3.95/4.5",
    status: "completed",
    url: "https://sites.google.com/view/hpclab/",
  },
  {
    institution: "Korea University of Technology and Education (KOREATECH)",
    institutionShort: "KOREATECH",
    degree: "BS",
    department: "컴퓨터공학부 컴퓨터S/W전공, HRD 부전공",
    period: "2019.03 ~ 2023.08",
    gpa: "3.31/4.5",
    status: "completed",
  },
];
