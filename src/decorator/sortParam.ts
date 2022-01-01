import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const SortParam = createParamDecorator((data: any, ctx: ExecutionContext) => {
    const reqWrapper: Request = ctx.switchToHttp().getRequest();

    if (reqWrapper && reqWrapper.query && reqWrapper.query['sort']) {
        try {
            const json = JSON.parse(reqWrapper.query['sort'].toString());
            if (json.order) {
                json.order = `${json.order}`.toUpperCase();
            }
            return json;
        } catch (error) {
            return null;
        }
    } else {
        return null;
    }
});
