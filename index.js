// node: から始まるのは、Node.jsに標準で組み込まれているモジュールを読み込むときの作法じゃ
import { createServer } from "node:http";
import { URL } from "node:url";

// 環境変数 PORT が設定されていればその値を、なければ 8888 を使う
const PORT = process.env.PORT || 8888;

const server = createServer((req, res) => {
  // リクエストのURLをパースして、パス名やクエリパラメータを取得しやすくする
  const requestUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = requestUrl.pathname;

  console.log(`Request received for: ${pathname}`); // どのパスにリクエストが来たかログに出す

  // レスポンスのヘッダーに、文字コードがUTF-8であることを設定する
  // これをしないと日本語が文字化けしてしまうからの
  res.setHeader("Content-Type", "text/plain; charset=utf-8");

  if (pathname === "/") {
    console.log("Root path ('/') accessed.");
    // ステータスコード 200 (成功) を設定し、レスポンスを書き込む
    res.writeHead(200);
    res.end("こんにちは！");
  } else if (pathname === "/ask") {
    console.log("Ask path ('/ask') accessed.");
    // クエリパラメータ 'q' の値を取得する
    const question = requestUrl.searchParams.get("q") || "";
    res.writeHead(200);
    res.end(`Your question is '${question}'`);
  } else {
    console.log(`Unknown path: ${pathname}`);
    // どのパスにも当てはまらない場合は 404 Not Found を返す
    res.writeHead(404);
    res.end("ページが見つかりません");
  }
});

// 指定したポートでサーバーを起動する
server.listen(PORT, () => {
  console.log(
    `サーバーが起動しました。 http://localhost:${PORT} で待ち受け中です。`
  );
});
