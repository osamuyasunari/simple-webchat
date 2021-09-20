import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ChatAdapter } from './chat/chat.adapter'

declare const module: any

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })
  app.useWebSocketAdapter(new ChatAdapter(app))
  await app.listen(3000)

  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }

}
bootstrap();
