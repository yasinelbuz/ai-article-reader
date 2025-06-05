export type SiteConfig = {
    name: string;
    description: string;
    url: string;
    ogImage: string;
    mailSupport: string;
    authors?: {
      name: string;
    }[];
    links?: {
      twitter: string;
      github: string;
    };
  };

  export type GeneralLayoutProps = {
    children: React.ReactNode;
}

export type Level = "all" | "beginner" | "intermediate" | "advanced";

export type ReadStatus = "all" | "read" | "unread";


