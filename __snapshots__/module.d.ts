declare module "snapshots/*.spec.ts.js" {
  const snapshots: { [snapshotName: string]: string };
  export default snapshots;
}
