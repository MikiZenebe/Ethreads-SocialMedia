import toast from "react-hot-toast";

export default function useCopyUrl() {
  //Copy the username link to clipboard
  const copyURL = () => {
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL).then(() => {
      toast.error("Profile link copied");
    });
  };

  return copyURL;
}
