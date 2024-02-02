import {
  Button,
  CloseButton,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";

export default function ImageModal({ isOpen, onClose, img }) {
  const [loading, setLoading] = useState(false);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent>
        <ModalCloseButton />

        <ModalBody pb={4} w={"full"}>
          <Image
            className="mt-8 w-full h-[450px] object-cover"
            src={img}
            alt="Selected img"
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
