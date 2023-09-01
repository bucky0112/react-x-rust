FROM node:16

RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
ENV PATH="/root/.cargo/bin:${PATH}"

WORKDIR /app

RUN npm install -g create-react-app

COPY . /app

RUN yarn install

WORKDIR /app/wasm-lib
RUN cargo build --release
RUN cargo install wasm-bindgen-cli
RUN cargo install wasm-pack
RUN yarn build:wasm

WORKDIR /app

EXPOSE 3000

ENV NAME World

CMD ["npm", "start"]
