interface BlogCategory {
    title: string;
    description: string;
    displayNumber: number;
    status: string;
    parentId: string | null;
    url: string;
    thumbnail: string | null;
    metaTitle: string | null;
    metaDescription: string | null;
    metaKeyword: string | null;
    metaRobot: string | null;
    metaViewport: string | null;
    sitemap: string | null;
    canonicalUrl: string | null;
    tags: any[];
    categorys: BlogCategory[];
    id: string;
    createdUserId: string;
    updatedUserId: string | null;
    createdFullName: string;
    updatedFullName: string | null;
    createdDate: string;
    updatedDate: string | null;
  }
  
  interface BlogConfigItem {
    link: string | null;
    title: string;
    blogId: string | null;
    blog: string | null;
    categoryId: string | null;
    countryId: string | null;
    continent: string | null;
    videoIcon: boolean;
  }
  
  interface BlogConfig {
    title: string;
    config: BlogConfigItem[];
  }
  
  interface BlogItem {
    title: string;
    description: string;
    content: string;
    status: string;
    enumContinent: string | null;
    categoryIds: string[];
    countryIds: string[];
    categories: BlogCategory[];
    countries: any[];
    isHotNew: boolean;
    likeCount: number;
    viewCount: number;
    url: string;
    thumbnail: string;
    metaTitle: string | null;
    metaDescription: string | null;
    metaKeyword: string | null;
    metaRobot: string | null;
    metaViewport: string | null;
    sitemap: string | null;
    canonicalUrl: string | null;
    address: string | null;
    eventDate: string | null;
    tags: any[];
    config: BlogConfig;
    relatedBlogs: any | null;
    id: string;
    createdUserId: string;
    updatedUserId: string | null;
    createdFullName: string;
    updatedFullName: string | null;
    createdDate: string;
    updatedDate: string | null;
  }
  
  interface PagingInfo {
    pageSize: number;
    page: number;
    totalItems: number;
  }
  
  interface BlogResult {
    items: BlogItem[];
    pagingInfo: PagingInfo;
  }
  
  interface BlogApiResponse {
    result: BlogResult;
    errorMessages: string[];
    isOK: boolean;
    statusCode: number;
  }
  