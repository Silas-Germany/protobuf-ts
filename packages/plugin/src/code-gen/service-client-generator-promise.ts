import {
    DescriptorProto,
    MethodDescriptorProto,
    StringFormat,
    TypescriptImportManager
} from "@protobuf-ts/plugin-framework";
import * as ts from "typescript";
import {Interpreter} from "../interpreter";
import {ClientMethodGenerator} from "./service-client-generator";


export class ServiceClientGeneratorPromise implements ClientMethodGenerator {


    constructor(
        private readonly imports: TypescriptImportManager,
        private readonly interpreter: Interpreter,
        private readonly options: {
            runtimeRpcImportPath: string;
        },
    ) {
    }


    createUnary(methodDesc: MethodDescriptorProto, localName: string, methodIndex: number, inputTypeDesc: DescriptorProto, outputTypeDesc: DescriptorProto): ts.MethodDeclaration {
        let RpcOptions = this.imports.name('RpcOptions', this.options.runtimeRpcImportPath);
        return ts.createMethod(
            undefined, undefined, undefined,
            ts.createIdentifier(localName),
            undefined, undefined,
            [
                ts.createParameter(
                    undefined, undefined, undefined, ts.createIdentifier("input"), undefined,
                    ts.createTypeReferenceNode(ts.createIdentifier(this.imports.type(inputTypeDesc)), undefined)
                ),
                ts.createParameter(
                    undefined, undefined, undefined, ts.createIdentifier("options"), ts.createToken(ts.SyntaxKind.QuestionToken),
                    ts.createTypeReferenceNode(ts.createIdentifier(RpcOptions), undefined), undefined
                )
            ],
            ts.createTypeReferenceNode(
                ts.createIdentifier("Promise"),
                [
                    ts.createTypeReferenceNode(this.imports.type(outputTypeDesc), undefined)
                ]
            ),
            ts.createBlock(
                [
                    // const method = this.methods[0], opt = this._transport.mergeOptions(options), i = method.I.create(input);
                    ts.createVariableStatement(
                        undefined,
                        ts.createVariableDeclarationList(
                            [
                                ts.createVariableDeclaration(
                                    ts.createIdentifier("method"),
                                    undefined,
                                    ts.createElementAccess(
                                        ts.createPropertyAccess(ts.createThis(), ts.createIdentifier("methods")),
                                        ts.createNumericLiteral(methodIndex.toString())
                                    )
                                ),
                                ts.createVariableDeclaration(
                                    ts.createIdentifier("opt"),
                                    undefined,
                                    ts.createCall(
                                        ts.createPropertyAccess(
                                            ts.createPropertyAccess(
                                                ts.createThis(),
                                                ts.createIdentifier("_transport")
                                            ),
                                            ts.createIdentifier("mergeOptions")
                                        ),
                                        undefined,
                                        [ts.createIdentifier("options")]
                                    )
                                ),
                                ts.createVariableDeclaration(
                                    ts.createIdentifier("i"),
                                    undefined,
                                    ts.createCall(
                                        ts.createPropertyAccess(
                                            ts.createPropertyAccess(ts.createIdentifier("method"), ts.createIdentifier("I")),
                                            ts.createIdentifier("create")
                                        ),
                                        undefined,
                                        [ts.createIdentifier("input")]
                                    )
                                )
                            ],
                            ts.NodeFlags.Const
                        )
                    ),

                    ts.createVariableStatement(
                        undefined,
                        ts.createVariableDeclarationList(
                            [ts.createVariableDeclaration(
                                ts.createIdentifier("call"),
                                undefined,
                                ts.createCall(
                                    ts.createIdentifier("stackIntercept"),
                                    [
                                        ts.createTypeReferenceNode(this.imports.type(inputTypeDesc), undefined),
                                        ts.createTypeReferenceNode(this.imports.type(outputTypeDesc), undefined)
                                    ],
                                    [
                                        ts.createStringLiteral("unary"),
                                        ts.createPropertyAccess(
                                            ts.createThis(),
                                            ts.createIdentifier("_transport")
                                        ),
                                        ts.createIdentifier("method"),
                                        ts.createIdentifier("opt"),
                                        ts.createIdentifier("i")
                                    ]
                                )
                            )],
                            ts.NodeFlags.Const
                        )
                    ),
                    ts.createReturn(ts.createCall(
                        ts.createPropertyAccess(
                            ts.createIdentifier("Promise"),
                            ts.createIdentifier("resolve")
                        ),
                        undefined,
                        [ts.createCall(
                            ts.createPropertyAccess(
                                ts.createIdentifier("call"),
                                ts.createIdentifier("then")
                            ),
                            undefined,
                            [ts.createArrowFunction(
                                undefined,
                                undefined,
                                [ts.createParameter(
                                    undefined,
                                    undefined,
                                    undefined,
                                    ts.createIdentifier("finished"),
                                    undefined,
                                    undefined,
                                    undefined
                                )],
                                undefined,
                                ts.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
                                ts.createPropertyAccess(
                                    ts.createIdentifier("finished"),
                                    ts.createIdentifier("response")
                                )
                            )]
                        )]
                    ))

                ],
                true
            )
        );
    }


    createServerStreaming(methodDesc: MethodDescriptorProto, localName: string, methodIndex: number, inputTypeDesc: DescriptorProto, outputTypeDesc: DescriptorProto): ts.MethodDeclaration {
        let RpcOptions = this.imports.name('RpcOptions', this.options.runtimeRpcImportPath);

        // serverStream_promise(input: A, options?: RpcOptions): AsyncIterable<B>
        return ts.createMethod(
            undefined, undefined, undefined,
            ts.createIdentifier(localName),
            undefined, undefined,
            [
                ts.createParameter(
                    undefined, undefined, undefined, ts.createIdentifier("input"), undefined,
                    ts.createTypeReferenceNode(ts.createIdentifier(this.imports.type(inputTypeDesc)), undefined)
                ),
                ts.createParameter(
                    undefined, undefined, undefined, ts.createIdentifier("options"), ts.createToken(ts.SyntaxKind.QuestionToken),
                    ts.createTypeReferenceNode(ts.createIdentifier(RpcOptions), undefined), undefined
                )
            ],
            ts.createTypeReferenceNode(
                ts.createIdentifier("AsyncIterable"),
                [
                    ts.createTypeReferenceNode(this.imports.type(outputTypeDesc), undefined),
                ]
            ),
            ts.createBlock(
                [
                    // const method = this.methods[0], opt = this._transport.mergeOptions(options), i = method.I.create(input);
                    ts.createVariableStatement(
                        undefined,
                        ts.createVariableDeclarationList(
                            [
                                ts.createVariableDeclaration(
                                    ts.createIdentifier("method"),
                                    undefined,
                                    ts.createElementAccess(
                                        ts.createPropertyAccess(ts.createThis(), ts.createIdentifier("methods")),
                                        ts.createNumericLiteral(methodIndex.toString())
                                    )
                                ),
                                ts.createVariableDeclaration(
                                    ts.createIdentifier("opt"),
                                    undefined,
                                    ts.createCall(
                                        ts.createPropertyAccess(
                                            ts.createPropertyAccess(
                                                ts.createThis(),
                                                ts.createIdentifier("_transport")
                                            ),
                                            ts.createIdentifier("mergeOptions")
                                        ),
                                        undefined,
                                        [ts.createIdentifier("options")]
                                    )
                                ),
                                ts.createVariableDeclaration(
                                    ts.createIdentifier("i"),
                                    undefined,
                                    ts.createCall(
                                        ts.createPropertyAccess(
                                            ts.createPropertyAccess(ts.createIdentifier("method"), ts.createIdentifier("I")),
                                            ts.createIdentifier("create")
                                        ),
                                        undefined,
                                        [ts.createIdentifier("input")]
                                    )
                                )
                            ],
                            ts.NodeFlags.Const
                        )
                    ),

                    // const call = stackIntercept<A, B>("serverStreaming", this._transport, method, opt, i);
                    ts.createVariableStatement(
                        undefined,
                        ts.createVariableDeclarationList(
                            [ts.createVariableDeclaration(
                                ts.createIdentifier("call"),
                                undefined,
                                ts.createCall(
                                    ts.createIdentifier("stackIntercept"),
                                    [
                                        ts.createTypeReferenceNode(this.imports.type(inputTypeDesc), undefined),
                                        ts.createTypeReferenceNode(this.imports.type(outputTypeDesc), undefined)
                                    ],
                                    [
                                        ts.createStringLiteral("serverStreaming"),
                                        ts.createPropertyAccess(
                                            ts.createThis(),
                                            ts.createIdentifier("_transport")
                                        ),
                                        ts.createIdentifier("method"),
                                        ts.createIdentifier("opt"),
                                        ts.createIdentifier("i")
                                    ]
                                )
                            )],
                            ts.NodeFlags.Const
                        )
                    ),

                    // const stream = new RpcOutputStreamController<B>();
                    ts.createVariableStatement(
                        undefined,
                        ts.createVariableDeclarationList(
                            [ts.createVariableDeclaration(
                                ts.createIdentifier("stream"),
                                undefined,
                                ts.createNew(
                                    ts.createIdentifier(this.imports.name("RpcOutputStreamController", this.options.runtimeRpcImportPath)),
                                    [ts.createTypeReferenceNode(
                                        ts.createIdentifier(this.imports.type(outputTypeDesc)),
                                        undefined
                                    )],
                                    []
                                )
                            )],
                            ts.NodeFlags.Const
                        )
                    ),

                    // call.response.onNext(stream.notifyNext.bind(stream));
                    ts.createExpressionStatement(ts.createCall(
                        ts.createPropertyAccess(
                            ts.createPropertyAccess(
                                ts.createIdentifier("call"),
                                ts.createIdentifier("response")
                            ),
                            ts.createIdentifier("onNext")
                        ),
                        undefined,
                        [ts.createCall(
                            ts.createPropertyAccess(
                                ts.createPropertyAccess(
                                    ts.createIdentifier("stream"),
                                    ts.createIdentifier("notifyNext")
                                ),
                                ts.createIdentifier("bind")
                            ),
                            undefined,
                            [ts.createIdentifier("stream")]
                        )]
                    )),

                    // call.status.catch(e => stream.closed || stream.notifyError(e) );
                    ts.createExpressionStatement(ts.createCall(
                        ts.createPropertyAccess(
                            ts.createPropertyAccess(
                                ts.createIdentifier("call"),
                                ts.createIdentifier("status")
                            ),
                            ts.createIdentifier("catch")
                        ),
                        undefined,
                        [ts.createArrowFunction(
                            undefined,
                            undefined,
                            [ts.createParameter(
                                undefined,
                                undefined,
                                undefined,
                                ts.createIdentifier("e"),
                                undefined,
                                undefined,
                                undefined
                            )],
                            undefined,
                            ts.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
                            ts.createBinary(
                                ts.createPropertyAccess(
                                    ts.createIdentifier("stream"),
                                    ts.createIdentifier("closed")
                                ),
                                ts.createToken(ts.SyntaxKind.BarBarToken),
                                ts.createCall(
                                    ts.createPropertyAccess(
                                        ts.createIdentifier("stream"),
                                        ts.createIdentifier("notifyError")
                                    ),
                                    undefined,
                                    [ts.createIdentifier("e")]
                                )
                            )
                        )]
                    )),

                    // return stream;
                    ts.createReturn(ts.createIdentifier("stream"))
                ],
                true
            )
        );
    }


    createClientStreaming(methodDesc: MethodDescriptorProto, localName: string, methodIndex: number, inputTypeDesc: DescriptorProto, outputTypeDesc: DescriptorProto): ts.MethodDeclaration {
        let RpcOptions = this.imports.name('RpcOptions', this.options.runtimeRpcImportPath);
        let ClientStreamingCall = this.imports.name('ClientStreamingCall', this.options.runtimeRpcImportPath);

        // TODO #8 implement method style PROMISE for client-streaming method
        console.error("TODO #8 implement method style PROMISE for client-streaming method "+StringFormat.formatName(methodDesc));


        return ts.createMethod(
            undefined, undefined, undefined,
            ts.createIdentifier(localName),
            undefined, undefined,
            [
                ts.createParameter(
                    undefined, undefined, undefined, ts.createIdentifier("options"), ts.createToken(ts.SyntaxKind.QuestionToken),
                    ts.createTypeReferenceNode(ts.createIdentifier(RpcOptions), undefined), undefined
                )
            ],
            ts.createTypeReferenceNode(
                ClientStreamingCall,
                [
                    ts.createTypeReferenceNode(this.imports.type(inputTypeDesc), undefined),
                    ts.createTypeReferenceNode(this.imports.type(outputTypeDesc), undefined),
                ]
            ),
            ts.createBlock(
                [

                    // const method = this.methods[0], opt = this._transport.mergeOptions(options)
                    ts.createVariableStatement(
                        undefined,
                        ts.createVariableDeclarationList([
                                ts.createVariableDeclaration(
                                    ts.createIdentifier("method"),
                                    undefined,
                                    ts.createElementAccess(
                                        ts.createPropertyAccess(ts.createThis(), ts.createIdentifier("methods")),
                                        ts.createNumericLiteral(methodIndex.toString())
                                    )
                                ),
                                ts.createVariableDeclaration(
                                    ts.createIdentifier("opt"),
                                    undefined,
                                    ts.createCall(
                                        ts.createPropertyAccess(
                                            ts.createPropertyAccess(
                                                ts.createThis(),
                                                ts.createIdentifier("_transport")
                                            ),
                                            ts.createIdentifier("mergeOptions")
                                        ),
                                        undefined,
                                        [ts.createIdentifier("options")]
                                    )
                                )],
                            ts.NodeFlags.Const
                        )
                    ),

                    // return stackIntercept("clientStreaming", this._transport, methods, opt);
                    ts.createReturn(ts.createCall(
                        ts.createIdentifier(this.imports.name('stackIntercept', this.options.runtimeRpcImportPath)),
                        undefined,
                        [
                            ts.createStringLiteral("clientStreaming"),
                            ts.createPropertyAccess(ts.createThis(), ts.createIdentifier("_transport")),
                            ts.createIdentifier("method"),
                            ts.createIdentifier("opt")
                        ]
                    )),
                ],
                true
            )
        );
    }


    createDuplexStreaming(methodDesc: MethodDescriptorProto, localName: string, methodIndex: number, inputTypeDesc: DescriptorProto, outputTypeDesc: DescriptorProto): ts.MethodDeclaration {
        let RpcOptions = this.imports.name('RpcOptions', this.options.runtimeRpcImportPath);
        let DuplexStreamingCall = this.imports.name('DuplexStreamingCall', this.options.runtimeRpcImportPath);

        // TODO #8 implement method style PROMISE for duplex method
        console.error("TODO #8 implement method style PROMISE for duplex method "+StringFormat.formatName(methodDesc));


        return ts.createMethod(
            undefined, undefined, undefined,
            ts.createIdentifier(localName),
            undefined, undefined,
            [
                ts.createParameter(
                    undefined, undefined, undefined, ts.createIdentifier("options"), ts.createToken(ts.SyntaxKind.QuestionToken),
                    ts.createTypeReferenceNode(ts.createIdentifier(RpcOptions), undefined), undefined
                )
            ],
            ts.createTypeReferenceNode(
                DuplexStreamingCall,
                [
                    ts.createTypeReferenceNode(this.imports.type(inputTypeDesc), undefined),
                    ts.createTypeReferenceNode(this.imports.type(outputTypeDesc), undefined),
                ]
            ),
            ts.createBlock(
                [

                    // const method = this.methods[0], opt = this._transport.mergeOptions(options)
                    ts.createVariableStatement(
                        undefined,
                        ts.createVariableDeclarationList([
                                ts.createVariableDeclaration(
                                    ts.createIdentifier("method"),
                                    undefined,
                                    ts.createElementAccess(
                                        ts.createPropertyAccess(ts.createThis(), ts.createIdentifier("methods")),
                                        ts.createNumericLiteral(methodIndex.toString())
                                    )
                                ),
                                ts.createVariableDeclaration(
                                    ts.createIdentifier("opt"),
                                    undefined,
                                    ts.createCall(
                                        ts.createPropertyAccess(
                                            ts.createPropertyAccess(
                                                ts.createThis(),
                                                ts.createIdentifier("_transport")
                                            ),
                                            ts.createIdentifier("mergeOptions")
                                        ),
                                        undefined,
                                        [ts.createIdentifier("options")]
                                    )
                                )],
                            ts.NodeFlags.Const
                        )
                    ),

                    // return stackIntercept("duplex", this._transport, this, methods, opt);
                    ts.createReturn(ts.createCall(
                        ts.createIdentifier(this.imports.name('stackIntercept', this.options.runtimeRpcImportPath)),
                        undefined,
                        [
                            ts.createStringLiteral("duplex"),
                            ts.createPropertyAccess(ts.createThis(), ts.createIdentifier("_transport")),
                            ts.createIdentifier("method"),
                            ts.createIdentifier("opt")
                        ]
                    )),
                ],
                true
            )
        );
    }


}
