export default function FolderView() {
  return (
    <div className="overflow-auto">
      <h1>Live Tree State</h1>
    </div>
  );
}

export type TFiles = {
  isFile: true;
  name: string;
  fileType: string;
} | {
  isFile: false;
  name: string;
  children: Array<TFiles>;
};
