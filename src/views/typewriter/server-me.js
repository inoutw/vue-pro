/* eslint-disable @typescript-eslint/naming-convention */

import http from 'http';
import httpProxy from 'http-proxy';
import axios from 'axios';

const proxy = httpProxy.createProxyServer({});
const server = http.createServer((req, res) => {
    // 设置跨域头部
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');

  // 处理预检请求（OPTIONS 请求）
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // 将请求转发到目标服务器
  console.log('req----', req);
  if(req.url.indexOf('/chat') > -1) {
    proxy.web(req, res, { target: 'https://121.40.104.79', secure: false });
  }else {
    proxy.web(req, res, { target: 'http://127.0.0.1:7860', secure: false });
  }
  // proxy.web(req, res, { target: 'http://10.10.12.174', secure: false });

//   if (req.method === 'POST') {
//     let body = '';

//     req.on('data', (chunk) => {
//       body += chunk;
//     });

//     req.on('end', () => {
//       // 在这里处理请求的 body 参数
//       console.log('POST 请求的 body 参数:', body);

//       res.setHeader('Access-Control-Allow-Origin', '*');
//       req.setHeader('Authorization', `Bearer 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`);
//       // 将请求转发到目标服务器
//       proxy.web(req, res, { target: 'http://121.40.104.79' });
//     });
//   } else {
//     // 将请求转发到目标服务器
//     proxy.web(req, res, { target: 'http://121.40.104.79' });
//   }


//   handleProxyRequest(req, res);
});

const makeRequestParam = (messages) => {
    let sendMessages = [];
    if(typeof messages === 'string') {
        sendMessages = [{
            role: 'user',
            content: messages
          }];
    }else {
        sendMessages = messages.map((v) => ({
         role: 'user',
         content: v
       }));
    }

  return {
    messages: sendMessages,
    stream: false,
    model: 'gpt-3.5-turbo',
    temperature: 1,
    presence_penalty: 0
  };
};

async function handleProxyRequest(req, res) {
  const remoteApiUrl = 'http://121.40.104.79';
  const remoteApiPath = '/openai/v1/chat/completions';
    console.log('req------', req);
  if (req.url.startsWith('/codecheck') ) {
    // const code = req.url.split('?')[1].split('=')[1];

    let body = '';
    if (req.method === 'OPTIONS' || req.method === 'POST') {
    
        req.on('data', (chunk) => {
          body += chunk;
        });
    
        req.on('end', () => {
          // 在这里处理请求的 body 参数
          console.log('POST请求的body参数:', body);
          // 继续处理其他逻辑...
        });
      } 


    const reqBody = makeRequestParam(body);
    try {
        console.log('body', body);
      const response = await axios.post(remoteApiUrl + remoteApiPath, reqBody, {
        headers: {
            Authorization: `Bearer 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`
        }
      });

      res.setHeader('Access-Control-Allow-Origin', '*');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(response.data));
    } catch (error) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error occurred while requesting remote API.');
    }
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
  }
}
server.listen('3333', ()=>{
    console.log('server is listening at 3333')
})