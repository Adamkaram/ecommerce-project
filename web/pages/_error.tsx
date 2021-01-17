import Link from "next/link";

function CustomError({ statusCode }) {
  const message = code => {
    switch (code) {
      case 404:
        return " الصفحة غير موجودة ";

      case 403:
        return " ليس لديك صلاحية لهذه الصفحة ";

      default:
        return " حدث خطأ ما حاول مرة اخري لاحقاً ";
    }
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          minHeight: 400,

          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <h1>{statusCode} | </h1>

          <h5 style={{ marginRight: 15 }}> {message(statusCode)}</h5>
        </div>
        <Link href="/">
          <a>
            <h5>الرئيسية</h5>
          </a>
        </Link>
      </div>
    </>
  );
}

function getInitialProps({ res, err }) {
  let statusCode;
  // If the res variable is defined it means nextjs
  // is in server side
  if (res) {
    statusCode = res.statusCode;
  } else if (err) {
    // if there is any error in the app it should
    // return the status code from here
    statusCode = err.statusCode;
  } else {
    // Something really bad/weird happen and status code
    // cannot be determined.
    statusCode = null;
  }
  return { statusCode };
}

CustomError.getInitialProps = getInitialProps;

export default CustomError;
