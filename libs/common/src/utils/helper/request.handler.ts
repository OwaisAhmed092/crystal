import { HttpException, HttpStatus } from "@nestjs/common";
import { Observable, catchError, firstValueFrom } from "rxjs";

export async function resolveObservable<T>(observable: Observable<T>): Promise<T> {
    return firstValueFrom(
        observable.pipe(
            catchError(error => {
                console.log("errorResolve", error)
                if (error.code == 'ECONNREFUSED')
                    throw new HttpException('Error occurred while processing request', HttpStatus.BAD_GATEWAY);
                else if (error.status)
                    throw new HttpException(error.message, error.status);
                else
                    throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
            })
        )
    );
}