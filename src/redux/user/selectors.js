export const selectUser = (state) => state.user.user;
export const selectUserError = (state) => state.user.isLoading;
export const selectUserIsLoadong = (state) => state.user.error;
export const selectPhotoUrl = (state) => state.user.photoUrl;
export const selectStatus = (state) => state.user.status;
export const selectError = (state) => state.user.error;
