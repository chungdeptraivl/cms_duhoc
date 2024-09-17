import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: BlogItem = {
  title: "",
  description: "",
  content: "",
  status: "",
  enumContinent: null,
  categoryIds: [],
  countryIds: [],
  categories: [],
  countries: [],
  isHotNew: false,
  likeCount: 0,
  viewCount: 0,
  url: "",
  thumbnail: "",
  metaTitle: null,
  metaDescription: null,
  metaKeyword: null,
  metaRobot: null,
  metaViewport: null,
  sitemap: null,
  canonicalUrl: null,
  address: null,
  eventDate: null,
  tags: [],
  config: {
    title: "",
    config: [],
  },
  relatedBlogs: null,
  id: "",
  createdUserId: "",
  updatedUserId: null,
  createdFullName: "",
  updatedFullName: null,
  createdDate: "",
  updatedDate: null,
};

const blogContentSlice = createSlice({
  name: "blogContent",
  initialState,
  reducers: {
    setBlogContent: (state, action: PayloadAction<BlogItem>) => {
      return action.payload;
    },
    updateTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    updateDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    updateContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
    },
    updateCategories: (state, action: PayloadAction<string[]>) => {
      state.categoryIds = action.payload;
    },
    updateContinent: (state, action: PayloadAction<string>) => {
      state.enumContinent = action.payload;
    },
    updateCountry: (state, action: PayloadAction<string[]>) => {
      state.countryIds = action.payload;
    },
  },
});

export const {
  setBlogContent,
  updateTitle,
  updateDescription,
  updateContent,
  updateCategories,
  updateContinent,
  updateCountry,
} = blogContentSlice.actions;
export default blogContentSlice.reducer;
