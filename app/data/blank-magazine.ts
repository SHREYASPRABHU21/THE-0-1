export type PageKind = "cover" | "inner" | "back";

export type MagazinePage = {
  id: string;
  kind: PageKind;
  number: number | null;
  label: string;
};

export const magazinePages: MagazinePage[] = [
  { id: "front-cover", kind: "cover", number: 1, label: "Front cover" },
  { id: "inner-1", kind: "inner", number: 1, label: "Inner page 1" },
  { id: "inner-2", kind: "inner", number: 2, label: "Inner page 2" },
  { id: "inner-3", kind: "inner", number: 3, label: "Inner page 3" },
  { id: "inner-4", kind: "inner", number: 4, label: "Inner page 4" },
  { id: "inner-5", kind: "inner", number: 5, label: "Inner page 5" },
  { id: "inner-6", kind: "inner", number: 6, label: "Inner page 6" },
  { id: "inner-7", kind: "inner", number: 7, label: "Inner page 7" },
  { id: "inner-8", kind: "inner", number: 8, label: "Inner page 8" },
  { id: "back-cover", kind: "back", number: 10, label: "Back cover" },
];
