import { CircularProgress } from "@chakra-ui/react";
import { config } from "../config";

const Progress = ({ loading = false }) => {
  if (!loading) {
    return null;
  }

  return (
    <div
      className={`flex w-[100vw] h-[100vh] justify-center items-center modal-backdrop${loading ? " show" : ""}`}
    >
      <CircularProgress isIndeterminate color={config.colors.primary} />
    </div>
  );
};

export default Progress;
