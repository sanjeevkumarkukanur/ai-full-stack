import {
  Body,
  Controller,
  Post,
  UseGuards,
  Req,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatDto } from './dto/chat.dto';
import { TrainDto } from './dto/train.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../../common/guards/jwt.guard';
import { RequestWithUser } from 'src/common/types/request-with-user';

@ApiTags('chat')
@ApiBearerAuth('access-token')
@UseGuards(JwtGuard) // 🔐 PROTECT ALL ROUTES
@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post()
  async chat(@Body() body: ChatDto, @Req() req: RequestWithUser) {
    const userId = req.user.sub; // ✅ SAFE

    return this.chatService.chat(userId, body.message);
  }

  @Post('train')
  async train(@Body() body: TrainDto, @Req() req: RequestWithUser) {
    const userId = req.user.sub;

    return this.chatService.train(userId, body.text);
  }
  @Get()
  async getAllChats() {
    const chats = await this.chatService.getAllChats();

    return {
      success: true,
      data: chats,
    };
  }

  // ✅ GET CHATS BY USER ID
  // GET /chat/user/1
  @Get('user/:userId')
  async getChatsByUser(@Param('userId', ParseIntPipe) userId: number) {
    const chats = await this.chatService.getChatsByUser(userId);

    return {
      success: true,
      data: chats,
    };
  }
}
