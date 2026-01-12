export interface DocumentationTemplate {
    id: string;
    name: string;
    description: string;
    systemPrompt: string;
}

export interface ProjectMetadata {
    projectName?: string;
    language?: string;
    projectType?: string;
    targetAudience?: string;
}

export interface GenerationRequest {
    input: string;
    template: DocumentationTemplate;
    metadata?: ProjectMetadata;
}
