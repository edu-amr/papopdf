import { signIn } from "@/lib/auth";
import { cn } from "@/lib/utils";

interface GoogleLoginProps {
  className?: string;
}

export function GoogleLogin({ className }: GoogleLoginProps) {
  const loginWithGoogle = async () => {
    "use server";
    await signIn("google");
  };

  return (
    <form action={loginWithGoogle}>
      <button
        className={cn([
          "transition-all duration-300 flex items-center justify-center gap-[8px] px-[24px] border rounded-full transform active:scale-90 border-G030 hover:opacity-[80%] mt-[46px] w-full",
          className,
        ])}
      >
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          className="w-6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M43.611 20.083H42V20H24V28H35.303C33.654 32.657 29.223 36 24 36C17.373 36 12 30.627 12 24C12 17.373 17.373 12 24 12C27.059 12 29.842 13.154 31.961 15.039L37.618 9.382C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24C4 35.045 12.955 44 24 44C35.045 44 44 35.045 44 24C44 22.659 43.862 21.35 43.611 20.083Z"
            fill="#FFC107"
          ></path>
          <path
            d="M6.30603 14.691L12.877 19.51C14.655 15.108 18.961 12 24 12C27.059 12 29.842 13.154 31.961 15.039L37.618 9.382C34.046 6.053 29.268 4 24 4C16.318 4 9.65603 8.337 6.30603 14.691Z"
            fill="#FF3D00"
          ></path>
          <path
            d="M23.9999 44C29.1659 44 33.8599 42.023 37.4089 38.808L31.2189 33.57C29.1438 35.149 26.6075 36.0028 23.9999 36C18.7979 36 14.3809 32.683 12.7169 28.054L6.19495 33.079C9.50495 39.556 16.2269 44 23.9999 44Z"
            fill="#4CAF50"
          ></path>
          <path
            d="M43.611 20.083H42V20H24V28H35.303C34.5142 30.2164 33.0934 32.1532 31.216 33.571L31.219 33.569L37.409 38.807C36.971 39.205 44 34 44 24C44 22.659 43.862 21.35 43.611 20.083Z"
            fill="#1976D2"
          ></path>
        </svg>
        <span className="text-W100 font-semibold flex items-center justify-center gap-[12px]">
          Entrar com o Google{" "}
        </span>
      </button>
    </form>
  );
}
