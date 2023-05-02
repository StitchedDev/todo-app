const AddButton = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={32}
    height={32}
    viewBox="0 0 32 32"
    {...props}
  >
    <path
      d="M16 0C7.164 0 0 7.164 0 16s7.164 16 16 16 16-7.164 16-16S24.836 0 16 0zm8 18h-6v6h-4v-6H8v-4h6V8h4v6h6v4z"
      style={{
        fill: "green",
      }}
    />
  </svg>
);
export default AddButton;
