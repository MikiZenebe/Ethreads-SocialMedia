import { useToast } from "@chakra-ui/react";

const useShowToast = () => {
  const toast = useToast();
  const showToast = (title, description, status) => {
    toast({
      title,
      description,
      status,
      duration: 2000,
      isClosable: true,
      position: "top",
    });
  };
  return showToast;
};

export default useShowToast;
