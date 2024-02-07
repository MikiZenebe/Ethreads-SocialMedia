import useShowToast from "../hooks/useShowToast";

export default function useCopyUrl() {
  const showToast = useShowToast();
  //Copy the username link to clipboard
  const copyURL = () => {
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL).then(() => {
      showToast("Copied", "Profile link copied ⚡", "success");
    });
  };

  return copyURL;
}
