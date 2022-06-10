import { Connection, getConnection } from "typeorm";
import { SessionInfo } from "../@types/auth.types";
import { ProductOfInterestRepository, ProductRepository, SessionRepository, StablishmentRepository, TokenRepository, UserRepository } from "../repositories";
import { SharedProductRepository } from "../repositories/SharedProductRepository";
import { EmailService, ValidateService } from "../services";

export interface Context {
  db: {
    connection: Connection;
    userRepository: UserRepository;
    sessionRepository: SessionRepository;
    tokenRepository: TokenRepository;
    productRepository: ProductRepository;
    productOfInterestRepository: ProductOfInterestRepository;
    stablishmentRepository: StablishmentRepository;
    sharedProductRepository: SharedProductRepository;
  };
  services: {
    emailService: EmailService;
    validateService: ValidateService;
  };
  signature?: SessionInfo;
}

export class RequestContext {
  private static instance:Context;

  public static getInstance():Context {
    if (!RequestContext.instance) {
      RequestContext.instance = RequestContext.buildContext();
    }
    return RequestContext.instance;
  }

  private static buildContext(): Context {
    const connection = getConnection();
    return {
      db: {
        connection,
        userRepository: connection.getCustomRepository(UserRepository),
        sessionRepository: connection.getCustomRepository(SessionRepository),
        tokenRepository: connection.getCustomRepository(TokenRepository),
        productRepository: connection.getCustomRepository(ProductRepository),
        productOfInterestRepository: connection.getCustomRepository(ProductOfInterestRepository),
        stablishmentRepository: connection.getCustomRepository(StablishmentRepository),
        sharedProductRepository: connection.getCustomRepository(SharedProductRepository),
      },
      services: {
        emailService: new EmailService(),
        validateService: new ValidateService(),
      },
    };
  }
}
