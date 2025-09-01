import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { 
  Users, 
  HelpCircle, 
  Trophy, 
  Star, 
  Medal,
  Target,
  BookOpen,
  MessageSquare,
  Zap,
  Award,
  Crown
} from "lucide-react"

const GrupoAlunos = () => {
  // Mock data - substituir por dados reais da API
  const membrosEngajados = [
    { nome: "Amanda Santos", participacao: 95, pontos: 1247, nivel: "Diamante", mensagens: 89 },
    { nome: "Felipe Costa", participacao: 91, pontos: 1156, nivel: "Ouro", mensagens: 76 },
    { nome: "Isabella Lima", participacao: 88, pontos: 1089, nivel: "Ouro", mensagens: 68 },
    { nome: "Gabriel Silva", participacao: 85, pontos: 987, nivel: "Prata", mensagens: 62 },
    { nome: "Larissa Oliveira", participacao: 82, pontos: 923, nivel: "Prata", mensagens: 58 }
  ]

  const perguntasFrequentes = [
    { pergunta: "Como acesso os materiais do curso?", frequencia: 67 },
    { pergunta: "Onde estão as gravações das aulas?", frequencia: 54 },
    { pergunta: "Como faço para tirar dúvidas?", frequencia: 48 },
    { pergunta: "Tem certificado ao final?", frequencia: 42 },
    { pergunta: "Posso assistir as aulas depois?", frequencia: 39 },
    { pergunta: "Como funciona a avaliação?", frequencia: 35 }
  ]

  const ranking = [
    { posicao: 1, nome: "Amanda Santos", pontos: 1247, badge: "👑", nivel: "Diamante" },
    { posicao: 2, nome: "Felipe Costa", pontos: 1156, badge: "🥇", nivel: "Ouro" },
    { posicao: 3, nome: "Isabella Lima", pontos: 1089, badge: "🥈", nivel: "Ouro" },
    { posicao: 4, nome: "Gabriel Silva", pontos: 987, badge: "🥉", nivel: "Prata" },
    { posicao: 5, nome: "Larissa Oliveira", pontos: 923, badge: "🏅", nivel: "Prata" },
    { posicao: 6, nome: "Ricardo Nunes", pontos: 856, badge: "⭐", nivel: "Bronze" },
    { posicao: 7, nome: "Camila Torres", pontos: 798, badge: "⭐", nivel: "Bronze" },
    { posicao: 8, nome: "Bruno Alves", pontos: 734, badge: "⭐", nivel: "Bronze" }
  ]

  const conquistas = [
    { titulo: "Primeira Participação", descricao: "Participou da primeira aula", icone: "🎯", desbloqueado: 234 },
    { titulo: "Questionador", descricao: "Fez 10 perguntas", icone: "❓", desbloqueado: 156 },
    { titulo: "Estudioso", descricao: "Assistiu 5 aulas completas", icone: "📚", desbloqueado: 189 },
    { titulo: "Mentor", descricao: "Ajudou outros alunos", icone: "🤝", desbloqueado: 78 },
    { titulo: "Assíduo", descricao: "7 dias seguidos ativo", icone: "🔥", desbloqueado: 92 },
    { titulo: "Expert", descricao: "Completou um módulo", icone: "🎓", desbloqueado: 145 }
  ]

  const getNivelColor = (nivel: string) => {
    switch (nivel.toLowerCase()) {
      case 'diamante':
        return 'bg-purple-100 text-purple-800 hover:bg-purple-100'
      case 'ouro':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
      case 'prata':
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100'
      case 'bronze':
        return 'bg-orange-100 text-orange-800 hover:bg-orange-100'
      default:
        return 'bg-blue-100 text-blue-800 hover:bg-blue-100'
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Grupo de Alunos</h1>
        <p className="text-muted-foreground">Dashboard de engajamento e gamificação educacional</p>
      </div>

      {/* Estatísticas gerais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alunos Ativos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">347</div>
            <p className="text-xs text-emerald-600">+23 esta semana</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Participação</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <Progress value={87} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Perguntas Hoje</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">Média: 35/dia</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conquistas Desbloqueadas</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-emerald-600">+67 esta semana</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Membros mais engajados */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="w-5 h-5 mr-2" />
              Membros Mais Engajados
            </CardTitle>
            <CardDescription>Top 5 alunos com maior participação</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {membrosEngajados.map((membro, index) => (
                <div key={membro.nome} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline">#{index + 1}</Badge>
                    <div>
                      <p className="font-medium">{membro.nome}</p>
                      <p className="text-sm text-muted-foreground">{membro.mensagens} mensagens</p>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <Badge className={getNivelColor(membro.nivel)}>{membro.nivel}</Badge>
                    <p className="text-sm font-medium">{membro.pontos} pts</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Perguntas mais frequentes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <HelpCircle className="w-5 h-5 mr-2" />
              Perguntas Mais Frequentes
            </CardTitle>
            <CardDescription>Dúvidas que mais aparecem no grupo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {perguntasFrequentes.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium">{item.pergunta}</p>
                    <Badge variant="secondary">{item.frequencia}x</Badge>
                  </div>
                  <Progress value={(item.frequencia / 67) * 100} className="h-2" />
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" className="mt-4 w-full">
              <BookOpen className="w-4 h-4 mr-2" />
              Criar FAQ Automático
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Seção de Gamificação */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ranking de Pontos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="w-5 h-5 mr-2" />
              Ranking de Pontos
            </CardTitle>
            <CardDescription>Classificação geral dos alunos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {ranking.map((aluno) => (
                <div key={aluno.posicao} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">{aluno.badge}</div>
                    <div>
                      <p className="font-medium">{aluno.nome}</p>
                      <Badge className={getNivelColor(aluno.nivel)} variant="secondary">
                        {aluno.nivel}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">{aluno.pontos}</p>
                    <p className="text-xs text-muted-foreground">pontos</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sistema de Níveis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Crown className="w-5 h-5 mr-2" />
              Sistema de Níveis
            </CardTitle>
            <CardDescription>Progressão dos alunos por níveis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-3xl mb-2">🥉</div>
                <h3 className="font-medium">Bronze</h3>
                <p className="text-sm text-muted-foreground">0-500 pontos</p>
                <p className="text-lg font-bold text-orange-600">89 alunos</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-3xl mb-2">🥈</div>
                <h3 className="font-medium">Prata</h3>
                <p className="text-sm text-muted-foreground">501-1000 pontos</p>
                <p className="text-lg font-bold text-gray-600">67 alunos</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-3xl mb-2">🥇</div>
                <h3 className="font-medium">Ouro</h3>
                <p className="text-sm text-muted-foreground">1001-1500 pontos</p>
                <p className="text-lg font-bold text-yellow-600">34 alunos</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-3xl mb-2">💎</div>
                <h3 className="font-medium">Diamante</h3>
                <p className="text-sm text-muted-foreground">1500+ pontos</p>
                <p className="text-lg font-bold text-purple-600">12 alunos</p>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}

export default GrupoAlunos