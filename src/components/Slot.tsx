import { motion } from "framer-motion";

interface SlotProps {
  target: number;
  items: string[];
}

export default function Slot({ target, items }: SlotProps) {
  const iconPositionInWheel = (idx: number) => -idx * (360 / items.length);

  return (
    <motion.div
      className="relative w-[70px] h-[150px]   border-purple-500/50 "
      //style={{ perspective: "100cm" }}
    >
      {items.map((icon, idx) => (
        <motion.div
          key={idx}
          className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-5xl text-white drop-shadow-glow  border-2 border-purple-500/50 "
          style={{
            backfaceVisibility: "hidden",
            originZ: -155,
            rotateX: iconPositionInWheel(idx),
          }}
          animate={{
            rotateX: -360 * (target + 1) + iconPositionInWheel(idx + target),
          }}
          transition={{ type: "tween", duration: 2 }}
        >
          {icon}
        </motion.div>
      ))}
    </motion.div>
  );
}