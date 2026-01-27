import Image from "next/image";

export function ProfileButton() {
  return (
    <div className="w-8 h-8 flex rounded-full">
      <Image
        width={64}
        height={64}
        src="https://yt3.ggpht.com/gW3FixHw7B6bpdaQVpAlpXzvvqtQxLyG53pJT-U3aUsSxFK6m1HS25OBi36EDYFkdJaCzoic=s88-c-k-c0x00ffffff-no-rj"
        alt="profile"
        className="rounded-full border-(--profile-border-color) cursor-pointer"
      />
    </div>
  );
}
