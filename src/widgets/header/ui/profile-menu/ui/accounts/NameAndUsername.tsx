import { SplitLine } from "@/shared/ui";

type NameAndEmailProps = {
  name: string;
  email: string;
};

export function NameAndEmail({ name, email }: NameAndEmailProps) {
  return (
    <div className="mt-4">
      <div className="px-4">
        <h2 className="text-[14px] px-px">{name}</h2>
        <p className="text-[12px] text-(--grey-text-color) px-px">{email}</p>
        <SplitLine className="border-white/12 mt-3" />
      </div>
    </div>
  );
}
