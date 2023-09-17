export interface User {
  role: string;
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  __v: number;
}

export interface Project {
  skills: string[];
  status: string;
  assignees: User[];
  _id: string;
  name: string;
  description: string;
  customer: string;
  createdAt: string;
  __v: number;
}

export interface ItemDropDown {
  label: string;
  value: string;
}

export interface AuthContextType {
  signIn: (username: string, password: string) => void;
  signOut: () => void;
  signUp: (name: string, email: string, password: string) => void;
}

export interface ItemProjectProps {
  item: Project;
  onPress: () => void;
}
