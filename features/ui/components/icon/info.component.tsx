export default function InfoIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18a8 8 0 110-16 8 8 0 010 16zm1-9h-2v5h2v-5zm0-3h-2v2h2V8z"
      />
    </svg>
  );
}
